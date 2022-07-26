import { Router } from 'express';
import { TripTemplateController } from '../controllers/trip-template.controller';

const TripTemplateRouter: Router = Router();

TripTemplateRouter.route('/')
  .get(TripTemplateController.getAll)
  .post(TripTemplateController.create);

TripTemplateRouter.route('/autocomplete')
  .get(TripTemplateController.search);

TripTemplateRouter.route('/:id')
  .get(TripTemplateController.getDetail)
  .delete(TripTemplateController.deleteOne)
  .patch(TripTemplateController.update);

TripTemplateRouter.route('/:id/events')
  .get(TripTemplateController.getEventsFromTripTemplate);

TripTemplateRouter.route('/:id/itinerary')
  .get(TripTemplateController.getItineraryFromTripTemplate);

export default TripTemplateRouter;
