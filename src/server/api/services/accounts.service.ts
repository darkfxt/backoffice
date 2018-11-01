import axios from 'axios';
import { config } from '../../config/env';


export class AccountsService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.core.url}/accounts`, {headers: {authorization: headers.authorization}});
  }

  public static async create(body, headers): Promise<any> {
    body.primary_color = body.primary_color.replace('#', '');
    body.secondary_color = body.secondary_color.replace('#', '');
    Reflect.deleteProperty(body, 'file');
    Reflect.deleteProperty(body, 'deleted_images');
    const resp = await axios.post(`${config.core.url}/accounts`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async update(id, body, headers): Promise<any> {
    return axios.put(`${config.core.url}/accounts/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async delete(id, headers): Promise<any> {
    return axios.delete(`${config.core.url}/accounts/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers): Promise<any> {
    return axios.get(`${config.core.url}/accounts/${id}`, {headers: {authorization: headers.authorization}});
  }

}
