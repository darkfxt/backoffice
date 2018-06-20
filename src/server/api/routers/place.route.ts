import {Router} from 'express';
import {PlaceController} from '../controllers/place.controller';
import {UploaderMiddleware} from '../../middlewares/uploader.middleware';

const PlaceRouter: Router = Router();

PlaceRouter.route('/autocomplete')
  .get(PlaceController.autocomplete);

PlaceRouter.route('/search')
  .get(PlaceController.search);

PlaceRouter.route('/:place_id')
  .get(PlaceController.getDetail);

PlaceRouter.route('/')
  .get(PlaceController.getAll)
  .post(UploaderMiddleware.uploader().array('files[]'), PlaceController.create);

export default PlaceRouter;
