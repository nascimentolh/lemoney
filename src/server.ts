import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
import helmet from 'helmet';
import { OfferController } from './controllers/offer';
import './util/module-alias';
import * as database from './database';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const offerController = new OfferController();
    this.addControllers([offerController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
