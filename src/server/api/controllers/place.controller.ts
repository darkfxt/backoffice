import { Request, Response, NextFunction } from 'express';
import { PlaceService } from '../services/place.service';
import Place from '../entity/Place';
import { httpstatus } from 'aws-sdk/clients/glacier';
import httpStatus = require('http-status');
import { PlaceType } from '../entity/enum/PlaceType';

const PRIVATE_TYPES: Array<PlaceType> = [
  PlaceType.DESTINATION,
  PlaceType.TERMINAL,
  PlaceType.HOTEL,
  PlaceType.ACTIVITY,
  PlaceType.POI
];

const PUBLIC_TYPES: Array<PlaceType> = [
  PlaceType.NEIGHBORHOOD,
  PlaceType.CITY
];


export class PlaceController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      request.query.page = +request.query.page + 1;
      const answer = await PlaceService.getAll(request.query, request.headers);
      answer.data.metadata.pageIndex = (+answer.data.metadata.page_index - 1).toString();
      if (request.query.simple) {
        response.json(answer.data.data);
        return;
      }
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async glAutocomplete(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await PlaceService.glAutocomplete(decodeURI(request.query.q), request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async autocomplete(request: Request, response: Response, next: NextFunction) {
    try {
      const {q, lang} = request.query;
      const company_id = (<any>request).loggedUser.Role !== 'TAYLOR_ADMIN' ? (<any>request).loggedUser.CompanyID : '';
      const promisePublic = PlaceService.glAutocomplete(decodeURI(q), lang);
      const promisePrivate = PlaceService.search(decodeURI(q), [], PRIVATE_TYPES, company_id, 20, lang, request.headers);
      const [dataPublic, dataPrivate] = await Promise.all([promisePublic, promisePrivate]);
      const resp = [];
      dataPrivate.forEach((tPlace) => resp.push({name: tPlace.name, place_id: tPlace._id, type: 'private'}));
      dataPublic.forEach((gPlace) => resp.push({name: gPlace.name, place_id: gPlace.place_id, type: 'public'}));
      response.json(resp);
    } catch (err) {
      next(err);
    }
  }

  public static async search(request: Request, response: Response, next: NextFunction) {
    try {
      const company_id = (<any>request).loggedUser.Role !== 'TAYLOR_ADMIN' ? (<any>request).loggedUser.CompanyID : '';
      const {search, lang} = request.query;
      const resp = await PlaceService.search(search, PUBLIC_TYPES, PRIVATE_TYPES, company_id, 20, lang, request.headers);
      response.json(resp);
    } catch (err) {
      next(err);
    }
  }

  public static async getGoogleDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await PlaceService.getGoogleDetail(request.params.place_id, request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await PlaceService.getDetail(request.params.place_id, request.headers, request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteOne(request: Request, response: Response, next: NextFunction) {
    try {
      const place = await PlaceService.deleteOne(request.params.place_id, request.headers);
      response.json(httpStatus.OK);
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
            key: image.key.split('/')[0],
            source: 'S3',
            url: image.location
          };
        });
      data.images = [...data.images, ...uploadedImages];
      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      data.company_id = (request as any).loggedUser.CompanyID;
      data.created_by = (request as any).loggedUser.Username;
      const oPlace = new Place(data);
      let place;
      if (request.params.place_id) {
        place = await PlaceService.update(request.params.place_id, oPlace, request.headers);
      } else {
        delete oPlace._id;
        place = await PlaceService.create(oPlace, request.headers);
      }

      response.json(place);
    } catch (err) {
      next(err);
    }
  }

}
