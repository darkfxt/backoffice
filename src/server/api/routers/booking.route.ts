import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';

const BookingRouter: Router = Router();

BookingRouter.route('/:id')
  .get(BookingController.getDetail)
  .delete(BookingController.delete)
  .post(BookingController.create);

BookingRouter.route('/')
  .get(BookingController.getAll);
