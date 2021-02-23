import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import logger from '@src/logger';
import { authMiddleware } from '@src/middlewares/auth';
import { Offer } from '@src/models/offer';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('offers')
export class OffersController extends BaseController {
  @Get()
  public async getOffers(_: Request, res: Response): Promise<void> {
    try {
      const offers = await Offer.find({}).sort({ premium: -1 });
      res.status(200).send(offers);
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }

  @Post()
  @Middleware(authMiddleware)
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const offer = new Offer(req.body);
      const result = await offer.save();
      res.status(201).send(result);
    } catch (error) {
      logger.error(error);
      this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }

  @Put(':id')
  @Middleware(authMiddleware)
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const offer = await Offer.findByIdAndUpdate(req.params.id, req.body);
      const updated = offer?.save();
      res.status(201).send(updated);
    } catch (error) {
      logger.error(error);
      this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }

  @Delete(':id')
  @Middleware(authMiddleware)
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await Offer.findByIdAndDelete(req.params.id);
      res.status(200).send({});
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }
}
