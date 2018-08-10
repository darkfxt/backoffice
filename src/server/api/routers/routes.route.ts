import {Router} from 'express';
import {S3Middleware} from '../../middlewares/s3.middleware';
import {RoutesController} from '../controllers/routes.controller';
import PlaceRouter from './place.route';
import {PlaceController} from '../controllers/place.controller';

const RoutesRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'routes'});

RoutesRouter.route('/')
  .get(RoutesController.getAll)
  .post([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], RoutesController.create);

RoutesRouter.route('/:id')
  .get(RoutesController.getDetail)
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], RoutesController.update);

export default RoutesRouter;
