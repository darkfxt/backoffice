import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const BookingRouter: Router = Router();

BookingRouter.route('/:id')
  .get(BookingController.getDetail)
  .delete(BookingController.delete)
  .patch(BookingController.update);

BookingRouter.route('/')
  .get(BookingController.getAll)
  .post(BookingController.create);

  export default BookingRouter;
