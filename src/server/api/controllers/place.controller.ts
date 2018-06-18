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
      const query: string[] = [];
      Object.entries(request.query).forEach(
        ([key, value]) => {
          if(key !== 'lang')
            query.push(`${key}=${value}`);
        }
      );
      const resp = await PlaceService.search(decodeURI(query.join('&')), request.query.lang);
      if(resp.data.length === 0)
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
      const geo = JSON.parse(request.body.geo);
      const data = {
        name: request.body.name,
        description: request.body.description,
        type: request.body.type,
        images: (<any>request).files.map(image => {
          return {key: image.key, location: image.location};
        }),
        place_id: request.body.place_id,
        geo: {
          point: geo.location,
          address: {
            streetAddress: geo.address
          }
        }
      };
      const place = await PlaceService.create(data);
      response.send(place.data);
    } catch (err) {
      next(err);
    }
  }

}
