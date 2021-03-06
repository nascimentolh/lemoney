import { Server } from '@overnightjs/core';
import logger from './logger';
import bodyParser from 'body-parser';
import { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import expressPino from 'express-pino-logger';
import './util/module-alias';
import * as database from './database';
import { UsersController } from './controllers/users';
import { OffersController } from './controllers/offers';

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
    this.app.use(expressPino({ logger }));
    this.app.use(cors({ origin: '*' }));
  }

  private setupControllers(): void {
    const offersController = new OffersController();
    const usersController = new UsersController();
    this.addControllers([offersController, usersController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
