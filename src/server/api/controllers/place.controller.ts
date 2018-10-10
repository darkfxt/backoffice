import { Request, Response, NextFunction } from 'express';
import { PlaceService } from '../services/place.service';
import Place from '../entity/Place';


export class PlaceController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await PlaceService.getAll(request.query);
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

  public static async search(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const resp = await PlaceService.search(request.query, request.query.lang);
      response.json(resp.data);
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
      const data = await PlaceService.getDetail(request.params.place_id, request.query.lang);
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
      if (request.params.place_id){
        place = await PlaceService.update(request.params.place_id, oPlace);
      } else {
        delete oPlace._id;
        place = await PlaceService.create(oPlace);
      }

      response.json(place.data);
    } catch (err) {
      next(err);
    }
  }

}
