import {Router} from 'express';
import {PlaceController} from '../controllers/place.controller';
import {S3Middleware} from '../../middlewares/s3.middleware';

const PlaceRouter: Router = Router();

PlaceRouter.route('/glautocomplete')
  .get(PlaceController.glAutocomplete);

PlaceRouter.route('/search')
  .get(PlaceController.search);

PlaceRouter.route('/:place_id')
  .get(PlaceController.getDetail);

PlaceRouter.route('/')
  .get(PlaceController.getAll)
  .patch([S3Middleware.uploader().array('files[]'), S3Middleware.deleteObjects], PlaceController.create);

export default PlaceRouter;
