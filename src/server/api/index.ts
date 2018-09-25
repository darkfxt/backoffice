import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as httpStatus from 'http-status';
import PlaceRouter from './routers/place.route';
import { fourOFour } from '../middlewares/404-middleware';
import RoutesRouter from './routers/routes.route';
import TripTemplateRouter from './routers/trip-template.route';
import UserRouter from './routers/user.route';
import AccountsRouter from './routers/accounts.route';

class Api {

    public api: express.Application;

    constructor() {
        this.api = express();
        this.middleware();
        // this.mongoSetup();
    }

    private middleware(): void {
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: false }));
        this.api.use('/places', PlaceRouter);
        this.api.use('/routes', RoutesRouter);
        this.api.use('/trip-templates', TripTemplateRouter);
        this.api.use('/users', UserRouter);
        this.api.use('/accounts', AccountsRouter);
        this.api.use(fourOFour);
        this.api.use((req, res) => {
          if (res.statusCode === httpStatus.NOT_FOUND) {
            res.json({
              message: httpStatus[httpStatus.NOT_FOUND],
            });
          }
        });
    }

    private mongoSetup(): void {
      createConnection().then(async connection => {

        console.log('Connection Succefull');

      }).catch(error => console.log('Error: ', error));
    }

}

export default new Api().api;
