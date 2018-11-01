import { Request, Response, NextFunction } from 'express';
import { TripTemplateService } from '../services/trip-template.service';
import Place from '../entity/Place';
import { DayOfTrip, TripTemplate } from '../entity/TripTemplate';

export class TripTemplateController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await TripTemplateService.getAll(request.query);
      if (request.query.simple) {
        response.json(answer.data.data);
        return;
      }
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async getEventsFromTripTemplate(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await TripTemplateService.getEventsFromTripTemplate(request.params.id);
      response.json(resp);
    } catch (err) {
      next(err);
    }
  }

  public static async getItineraryFromTripTemplate(request: Request, response: Response, next: NextFunction) {
    try {

      const resp = await TripTemplateService.getEventsFromTripTemplate(request.params.id);
      response.json(resp);
    } catch (err) {
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {

      // data.search_name = data.username.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      let resp;
      request.body.company_id = (request as any).loggedUser.CompanyID;
      if (request.params.id && request.params.id !== 'new' && request.params.id !== '' && request.params.id !== 'undefined') {
        Reflect.deleteProperty(request.body, '_id');
        resp = await TripTemplateService.update(request.params.id, request.body);
      } else {
        request.body.created_by = (request as any).loggedUser.Username;
        resp = await TripTemplateService.create(request.body);
      }
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async search(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await TripTemplateService.search(request.query, request.query.lang);
      response.json(resp.data);
    } catch (err) {
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {

      if (request.params.id && request.params.id !== 'undefined' && request.params.id !== 'new') {
        const answer = await TripTemplateService.getDetail(request.params.id, request.query.lang);
        response.json(answer.data);
      } else
        response.json(new TripTemplate(request.params.id, '', []));

    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);
      const uploadedImages = (<any>request).files
        .map(image => {
          return {
            key: image.key,
            source: 'S3',
            url: image.location
          };
        });
      data.images = [...data.images, ...uploadedImages];
      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const oPlace = new Place(data);
      let place;
      if (data._id)
        place = await TripTemplateService.update(data._id, oPlace);
      else {
        delete oPlace._id;
        place = await TripTemplateService.create(oPlace);
      }

      response.json(place.data);
    } catch (err) {
      next(err);
    }
  }

}
