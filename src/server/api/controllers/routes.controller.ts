import {Request, Response, NextFunction} from 'express';
import Route from '../entity/Route';
import {RoutesService} from '../services/routes.service';


export class RoutesController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const answer = await RoutesService.getAll(request.query);
      if(request.query.simple){
        response.json(answer.data.data);
        return;
      }
      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      data.images = (<any>request).files.map(value => ({
        key: value.key,
        source: 'S3',
        url: value.location
      }));

      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const route = new Route(data._id, data.name, data.search_name, data.route_type, data.road_surface, data.via, data.description, data.images, data.origin, data.destination, data.middle_points, data.things_to_know, data.legs);
      delete route._id;
      const resp = await RoutesService.create(route);
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      if((<any>request).files.length > 0){
        data.images = (<any>request).files.map(value => ({
          key: value.key,
          source: 'S3',
          url: value.location
        }));
      }

      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      // const body = new Route(data._id, data.name, data.search_name, data.route_type, data.road_surface, data.via, data.description, data.images, data.origin, data.destination, data.middle_points, data.things_to_know, data.legs);
      const resp = await RoutesService.update(request.params.id, data);
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await RoutesService.getDetail(request.params.id, request.query.lang);
      response.json(resp);
    } catch (err) {
      next(err);
    }
  }

}
