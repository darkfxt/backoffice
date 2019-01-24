import axios from 'axios';
import { config } from '../../config/env';

export class RoutesService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = '?';
    if (query.page)
      queryParams += `&page=${query.page}`;
    if (query.size)
      queryParams += `&limit=${query.size}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    if (query.created_by)
      queryParams += `&created_by=${query.created_by}`;
    return axios
      .get(`${config.trips.url}/routes${queryParams}`, {headers: {authorization: headers.authorization}});
  }

  public static async create(route, headers: any): Promise<any> {
    try {
      return await axios.post(`${config.trips.url}/routes`, route, {headers: {authorization: headers.authorization}});
    } catch (error) {
      throw error;
    }
  }

  public static async update(id, body, headers: any): Promise<any> {
    try {
      return await axios.put(`${config.trips.url}/routes/${id}`, body, {headers: {authorization: headers.authorization}});
    } catch (error) {
      throw error;
    }
  }

  public static async deleteOne(id: string, headers: any): Promise<any> {
    try {
      return await axios.delete(`${config.trips.url}/routes/${id}`, {headers: {authorization: headers.authorization}});
    } catch (error) {
      throw error;
    }
  }

  public static async getDetail(id: string, headers: any, lang: string = 'en'): Promise<any> {
    return axios
      .get(`${config.trips.url}/routes/${id}?lang=${lang}`, {headers: {authorization: headers.authorization}})
      .then(resp => {
        return resp.data;
      });
  }

}
