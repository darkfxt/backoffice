import {Router} from 'express';
import {S3Middleware} from '../../middlewares/s3.middleware';
import {RoutesController} from '../controllers/routes.controller';

const RoutesRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'routes'});

RoutesRouter.route('/')
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], RoutesController.create);

export default RoutesRouter;
