import { NextFunction, Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import httpStatus = require('http-status');
import GPXBuilder from '../../utils/GPXBuilder';
import BookingDTO from '../entity/dto/BookingDTO';

const fs = require('fs');

export class BookingController {
  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
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

  public static async getGPXFile(request: Request, response: Response, next: NextFunction) {
    try {
      let content: string = await BookingService.getGPXContent(request.params.id, request.headers)
      // Construct file
      let fileName: string = 'Booking' + request.params.id + '.gpx'
      fs.writeFile(fileName, content, function () {
        console.log('Booking GPX file created');
      });
      const file = fs.createReadStream(fileName);
      file.on('end', function () {
        fs.unlink(fileName, function () {
          console.log('Temporary file removed');
        });
      });
      response.header('Content-Disposition', 'attachment; filename="Booking.gpx"');
      file.pipe(response);
      return;
    } catch (err) {
      next(err);
    }
  }


}
