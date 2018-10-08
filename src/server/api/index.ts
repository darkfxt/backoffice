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
import CompanyRouter from './routers/company.route';
import { errorConverter } from '../core/errors/error-converter-middleware';
import RolesRouter from './routers/roles.route';

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
        this.api.use('/companies', CompanyRouter);
        this.api.use('/roles', RolesRouter);

      // try to convert all error to common interface
      this.api.use(errorConverter);

      this.api.use((err, req, res, next) => {
        // eslint-disable-line no-unused-vars
        // log the error and the request as it is.
        const error = {
          message: err.isPublic
            ? err.message
            : httpStatus[err.status] || httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          stack: err.isPublic ? err.stack : undefined,
          code: err.code,
          response: err.response,
        };
        if (this.api.get('env') === 'production') {
          Reflect.deleteProperty(error, 'stack');
        }
        res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json(error);
        console.error(err);
      });

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
