import axios from 'axios';
import { config } from '../../config/env';


export class AccountsService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = '';
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    return axios.get(`${config.core.url}/assets${queryParams}`, {headers: {authorization: headers.authorization}});
  }

  public static async create(body, headers): Promise<any> {
    const resp = await axios.post(`${config.core.url}/assets`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async update(id, body, headers): Promise<any> {
    return axios.put(`${config.core.url}/assets/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async delete(id, headers): Promise<any> {
    return axios.delete(`${config.core.url}/assets/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers): Promise<any> {
    return axios.get(`${config.core.url}/assets/${id}`, {headers: {authorization: headers.authorization}});
  }

}
