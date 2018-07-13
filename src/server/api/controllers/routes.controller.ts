import {Request, Response, NextFunction} from 'express';
import Route from '../entity/Route';
import {RoutesService} from '../services/routes.service';


export class RoutesController {

  public static async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      data.images = (<any>request).files.map(value => ({
        key: value.key,
        source: 'S3',
        url: value.location
      }));

      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const route = new Route(undefined, data.name, data.search_name, data.route_type, data.road_surface, data.via, data.description, data.images, data.origin, data.destination, data.middle_points, data.things_to_know, data.legs);
      delete route._id;
      const resp = await RoutesService.create(route);
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

}
