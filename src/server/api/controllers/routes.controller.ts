import { Request, Response, NextFunction } from 'express';
import Route from '../entity/Route';
import { RoutesService } from '../services/routes.service';
import httpStatus = require('http-status');


export class RoutesController {

  public static async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      if ((<any>request).loggedUser.Role !== 'TAYLOR_ADMIN')
        request.query.company_id = (<any>request).loggedUser.CompanyID;
      const answer = await RoutesService.getAll(request.query, request.headers);
      if (request.query.simple) {
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
      data.company_id = (request as any).loggedUser.CompanyID;
      data.created_by = (request as any).loggedUser.Username;

      const resp = await RoutesService.create(data, request.headers);
      response.json(resp);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async update(request: Request, response: Response, next: NextFunction) {
    try {
      const data = JSON.parse(request.body.data);

      if ((<any>request).files.length > 0) {
        data.images = (<any>request).files.map(value => ({
          key: value.key,
          source: 'S3',
          url: value.location
        }));
      }

      data.search_name = data.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      data.company_id = (request as any).loggedUser.CompanyID;
      const resp = await RoutesService.update(request.params.id, data, request.headers);
      response.json(resp.data);
    } catch (err) {
      // TODO: Delete uploaded files on error
      next(err);
    }
  }

  public static async getDetail(request: Request, response: Response, next: NextFunction) {
    try {
      const resp = await RoutesService.getDetail(request.params.id, request.headers, request.query.lang);
      response.json(resp);
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
