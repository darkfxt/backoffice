import axios from 'axios';
import { config } from '../../config/env';

export class RoutesService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    return axios
      .get(`${config.routes.url}/segments${queryParams}`, {headers: {authorization: headers.authorization}});
  }

  public static async create(route, headers: any): Promise<any> {
    if (route._id) Reflect.deleteProperty(route, '_id');
    const ret = await axios.post(`${config.routes.url}/segments`, route, {headers: {authorization: headers.authorization}});
    return ret.data;
  }

  public static async update(id, body, headers: any): Promise<any> {
    try {
      return await axios.patch(`${config.routes.url}/segments/${id}`, body, {headers: {authorization: headers.authorization}});
    } catch (error) {
      throw error;
    }
  }

  public static async deleteOne(id: string, headers: any): Promise<any> {
    try {
      return await axios.delete(`${config.routes.url}/segments/${id}`, {headers: {authorization: headers.authorization}});
    } catch (error) {
      throw error;
    }
  }

  public static async getDetail(id: string, headers: any, lang: string = 'en'): Promise<any> {
    return axios
      .get(`${config.routes.url}/segments/${id}?lang=${lang}`, {headers: {authorization: headers.authorization}})
      .then(resp => {
        return resp.data;
      });
  }

}
