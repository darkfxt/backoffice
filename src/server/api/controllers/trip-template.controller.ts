import {Request, Response, NextFunction} from 'express';
import { TripTemplateService } from '../services/trip-template.service';
import {TripTemplate, TripTemplateEmpty} from '../entity/TripTemplate';

import {PlaceService} from '../services/place.service';
import Place from '../entity/Place';
import {RoutesService} from '../services/routes.service';
import * as _ from 'lodash';

export class TripTemplateController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await TripTemplateService.getAll(request.query);
      if(request.query.simple){
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
      if(request.params.id && request.params.id !== 'undefined' && request.params.id !== 'new') {
        const answer = await TripTemplateService.getEventsFromTripTemplate(request.params.id);
        console.log('respuesta', answer);
        response.json(answer.data);
      } else if (request.params.id === undefined || request.params.id === 'undefined') {
        response.json([]);
      }
    } catch (err) {
      next(err);
    }
  }

  public static async getItineraryFromTripTemplate(request: Request, response: Response, next: NextFunction) {
    try {
      if(request.params.id && request.params.id !== 'undefined' && request.params.id !== 'new') {
        const answer = await TripTemplateService.getEventsFromTripTemplate(request.params.id);
        const arreglo = [];
        _.forEach(_.groupBy(answer.data, 'ordinal'), (value, key) => arreglo.push({day: key, events: value}));
        response.json(arreglo);
      } else if (request.params.id === undefined || request.params.id === 'undefined') {
        response.json([]);
      }
    } catch (err) {
      next(err);
    }
  }

  // public static async glAutocomplete(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const data = await TripTemplateService.glAutocomplete(decodeURI(request.query.q), request.query.lang);
  //     response.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      // const data = JSON.parse(request.body.data);

      // data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // const body = new Route(data._id, data.name, data.search_name, data.route_type, data.road_surface, data.via, data.description, data.images, data.origin, data.destination, data.middle_points, data.things_to_know, data.legs);
      let resp;
      if(request.params.id && request.params.id !== 'new' && request.params.id !== '' && request.params.id !== 'undefined') {
        Reflect.deleteProperty(request.body, '_id');
        resp = await TripTemplateService.update(request.params.id, request.body);
      } else {
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
      const answer = await TripTemplateService.getDetail(request.params.id, request.query.lang);
      response.json(answer.data);
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
      if(data._id)
        place = await TripTemplateService.update(data._id, oPlace);
      else{
        delete oPlace._id;
        place = await TripTemplateService.create(oPlace);
      }

      response.json(place.data);
    } catch (err) {
      next(err);
    }
  }

}
