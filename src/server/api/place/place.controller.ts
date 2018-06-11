import {Request, Response, NextFunction} from 'express';
import {PlaceService} from './Place.service';


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
      const data = await PlaceService.autocomplete(request.query.q, request.query.lang);
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
      const res = {
        files: (<any>request).files,
        params: request.body
      };
      response.send(res);
    } catch (err) {
      next(err);
    }
  }

}
