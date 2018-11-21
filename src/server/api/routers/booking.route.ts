import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const BookingRouter: Router = Router();

BookingRouter.route('/:id')
  .get(BookingController.getDetail)
  .delete(BookingController.delete)
  .patch(BookingController.update);

BookingRouter.route('/:id/export')
  .get(BookingController.getGPXFile);

BookingRouter.route('/')
  .get(BookingController.getAll)
  .post(BookingController.create);

  export default BookingRouter;
