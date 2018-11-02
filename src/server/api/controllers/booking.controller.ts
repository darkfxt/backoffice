import { NextFunction, Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import httpStatus = require('http-status');

export class BookingController {
  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await BookingService.getAll(request.query, request.headers);
      if (request.query.simple) {
        response.json(answer.data.data);
        return;
      }
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await BookingService.getDetail(request.params.id, request.headers);
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const booking = await BookingService.create(request.body, request.headers);

      response.json(booking.data);
    } catch (err) {
      next(err);
    }
  }

  public static async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await BookingService.delete(request.params.id, request.headers);

      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await BookingService.update(request.params.id, request.body, request.headers);

      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

}
