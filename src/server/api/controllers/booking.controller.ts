import { NextFunction, Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import httpStatus = require('http-status');
import { ItineraryFactory } from '../factories/itinerary.factory';
import * as pdf from 'html-pdf';

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
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.body.company_id = (<any>request).loggedUser.CompanyID;
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
      if (typeof request.body.account_id !== 'number')
        request.body.account_id = request.body.account_id.id;
      if (request.body.device_id && (typeof request.body.device_id !== 'number'))
        request.body.gps_device = {
          id: request.body.device_id.id,
          name: request.body.device_id.name,
          pick_up: request.body.pickup_point,
          drop_off: request.body.dropoff_point
      };
      const resp = await BookingService.update(request.params.id, request.body, request.headers);

      response.json(resp.data);
    } catch (err) {
      next(err);
    }
  }

  public static async getGPXFile(request: Request, response: Response, next: NextFunction) {
    try {
      const content: string = await BookingService.getGPXContent(request.params.id, request.headers);
      // Construct file
      const fileName: string = 'Booking' + request.params.id + '.gpx';
      fs.writeFile(fileName, content, function () {
        console.log('Booking GPX file created');
        const file = fs.createReadStream(fileName);
        file.on('end', function () {
          fs.unlink(fileName, function () {
            console.log('Temporary file removed');
          });
        });
        response.header('Content-Disposition', 'attachment; filename="Booking.gpx"');
        file.pipe(response);
      });
    } catch (err) {
      next(err);
    }
  }

  public static async getPDFFile(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await BookingService.getDetail(request.params.id, request.headers);
      const booking = new ItineraryFactory(resp.data);
      if (request.query.edit)
        return response.render('itinerary', booking);
      response.render('itinerary', booking, (err, html) => {
        pdf.create(html, {}).toStream((error, stream) => {
          if (error)
            throw error;
          stream.pipe(response);
        });
      });
    } catch (err) {
      next(err);
    }
  }


}
