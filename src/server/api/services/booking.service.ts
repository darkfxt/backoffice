import axios from 'axios';
import { config } from '../../config/env';

export class BookingService {
  public static async getAll(query, headers): Promise<any> {
    return axios.get(`${config.routes.url}/booking`, {headers: {authorization: headers.authorization}});
  }

  public static async create (body, headers): Promise<any> {
    const resp = await axios.post(`${config.routes.url}/booking`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async delete (id, headers): Promise<any> {
    return axios.delete(`${config.core.url}/booking/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail (id, headers): Promise<any> {
    return axios.get(`${config.core.url}/booking/${id}`, {headers: {authorization: headers.authorization}});
  }
}
