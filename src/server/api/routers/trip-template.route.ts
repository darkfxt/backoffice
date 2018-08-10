import {Router} from 'express';
import { TripTemplateController } from '../controllers/trip-template.controller';

const TripTemplateRouter: Router = Router();

TripTemplateRouter.route('/')
  .get(TripTemplateController.getAll)
  .post(TripTemplateController.create);

TripTemplateRouter.route('/:id')
  .get(TripTemplateController.getDetail);
  // .patch(TripTemplateController.update);

export default TripTemplateRouter;
