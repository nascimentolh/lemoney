import { ClassMiddleware, Controller, Get, Post } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import { Offer } from '@src/models/offer';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('offers')
@ClassMiddleware(authMiddleware)
export class OffersController extends BaseController {
  @Get()
  public async getOffers(_: Request, res: Response): Promise<void> {
    try {
      const offers = await Offer.find({});
      res.status(200).send(offers);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }

  @Post()
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const offer = new Offer(req.body);
      const result = await offer.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }
}
