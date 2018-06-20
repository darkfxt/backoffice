import {Request, Response, NextFunction} from 'express';
import {PlaceService} from '../services/place.service';


export class PlaceController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      response.send('ok');
    } catch (err) {
      next(err);
    }
  }

  public static async autocomplete(request: Request, response: Response, next: NextFunction) {
    try {
      const data = await PlaceService.autocomplete(decodeURI(request.query.q), request.query.lang);
      response.json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async search(request: Request, response: Response, next: NextFunction) {
    try {

      const resp = await PlaceService.search(request.query, request.query.lang);
      if (resp.data.length === 0)
        return response.sendStatus(404);
      response.json(resp.data);
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
      data.images = (<any>request).files.map(image => {
        return {
          key: image.key,
          source: 'S3',
          sizes: [{size: 'original', url: image.location}]
        };
      });
      const place = await PlaceService.create(data);
      response.json(place.data);
    } catch (err) {
      next(err);
    }
  }

}
