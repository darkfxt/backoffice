import {Request, Response, NextFunction} from 'express';
import { TripTemplateService } from '../services/trip-template.service';
import { TripTemplate } from '../entity/TripTemplate';

import {PlaceService} from '../services/place.service';
import Place from '../entity/Place';


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

  // public static async glAutocomplete(request: Request, response: Response, next: NextFunction) {
  //   try {
  //     const data = await TripTemplateService.glAutocomplete(decodeURI(request.query.q), request.query.lang);
  //     response.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

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
      const data = await TripTemplateService.getDetail(request.params.trip_template_id, request.query.lang);
      response.json(data);
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
