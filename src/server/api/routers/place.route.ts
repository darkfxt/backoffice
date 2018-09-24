import { Router } from 'express';
import { PlaceController } from '../controllers/place.controller';
import { S3Middleware } from '../../middlewares/s3.middleware';

const PlaceRouter: Router = Router();
const s3Middleware: S3Middleware = new S3Middleware({bucket: 'places'});

PlaceRouter.route('/glautocomplete')
  .get(PlaceController.glAutocomplete);

PlaceRouter.route('/search')
  .get(PlaceController.search);

PlaceRouter.route('/google/:place_id')
  .get(PlaceController.getGoogleDetail);

PlaceRouter.route('/:place_id')
  .get(PlaceController.getDetail)
  .patch([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], PlaceController.create);

PlaceRouter.route('/')
  .get(PlaceController.getAll)
  .post([s3Middleware.uploader().array('files[]'), s3Middleware.deleteObjects()], PlaceController.create);

export default PlaceRouter;
