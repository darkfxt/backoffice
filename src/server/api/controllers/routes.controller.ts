import { Request, Response, NextFunction } from 'express';
import Route from '../entity/Route';
import { RoutesService } from '../services/routes.service';
import httpStatus = require('http-status');
import { RouteTransformer } from '../entity/adapters/route.transformer';


export class RoutesController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await RoutesService.getAll(request.query, request.headers);
      if (request.query.simple)
        return response.json(answer.data.data);

      response.json(answer.data);
    } catch (err) {
      next(err);
    }
  }

  public static async create(request, response: Response, next: NextFunction) {
    try {
      const dto = JSON.parse(request.body);
      dto.company_id = (request as any).loggedUser.CompanyID;
      dto.created_by = (request as any).loggedUser.Username;
      if (request.files.length > 0)
        dto.images = request.files.map(value => ({
          key: value.key,
          source: 'S3',
          url: value.location
        }));
      const routeDTO = RouteTransformer.toDTO(dto);
      const resp = await RoutesService.create(routeDTO, request.headers);
      response.json(resp);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async update(request, response: Response, next: NextFunction) {
    try {
      const dto = JSON.parse(request.body);
      dto.company_id = (request as any).loggedUser.CompanyID;
      dto.created_by = (request as any).loggedUser.Username;
      if (request.files.length > 0)
        dto.images = request.files.map(value => ({
          key: value.key,
          source: 'S3',
          url: value.location
        }));
      const routeDTO = RouteTransformer.toDTO(dto);
      const resp = await RoutesService.update(request.params.id, routeDTO, request.headers);
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await RoutesService.getDetail(request.params.id, request.headers, request.query.lang);
      response.json(RouteTransformer.toRoute(resp));
    } catch (err) {
      next(err);
    }
  }

  public static async deleteOne(request: Request, response: Response, next: NextFunction) {
    try {
      const route = await RoutesService.deleteOne(request.params.id, request.headers);
      response.json(httpStatus.OK);
    } catch (err) {
      next(err);
    }
  }

}
