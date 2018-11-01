import { Router } from 'express';
import { S3Middleware } from '../../middlewares/s3.middleware';
import { RoutesController } from '../controllers/routes.controller';

const RoutesRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'routes'});

RoutesRouter.route('/')
  .get(RoutesController.getAll)
  .post([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], RoutesController.create);

RoutesRouter.route('/:id')
  .get(RoutesController.getDetail)
  .delete(RoutesController.deleteOne)
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], RoutesController.update);

export default RoutesRouter;
