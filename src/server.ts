import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
import helmet from 'helmet';
import { OfferController } from './controllers/offer';
import './util/module-alias';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const offerController = new OfferController();
    this.addControllers([offerController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
