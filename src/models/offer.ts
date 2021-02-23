import mongoose, { Document, Model } from 'mongoose';

export interface Offer {
  _id?: string;
  advertiser_name: string;
  url: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  premium: boolean;
  active: boolean;
}

interface OfferModel extends Omit<Offer, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    advertiser_name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    starts_at: { type: Date, required: true },
    ends_at: { type: Date, required: false },
    premium: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: false, default: false },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path('description').validate(function (description: string) {
  return description.length <= 500;
}, 'the maximum length is 500.');

schema.path('url').validate(function (url: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
}, 'this is not a valid URI.');

export const Offer: Model<OfferModel> = mongoose.model('Offer', schema);
