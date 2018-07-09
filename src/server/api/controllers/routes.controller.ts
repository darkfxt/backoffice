import {Request, Response, NextFunction} from 'express';


export class RoutesController {

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);
      data.image = {
        key: (<any>request).file.key,
        source: 'S3',
        url: (<any>request).file.location
      };
      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      response.json(data);
    } catch (err) {
      next(err);
    }
  }

}
