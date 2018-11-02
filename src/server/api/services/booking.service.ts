import axios from 'axios';
import { config } from '../../config/env';

export class BookingService {
  public static async getAll(query, headers): Promise<any> {
    return axios.get(`${config.routes.url}/bookings`, {headers: {authorization: headers.authorization}});
  }

  public static async create (body, headers): Promise<any> {
    const resp = await axios.post(`${config.routes.url}/bookings`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async delete (id, headers): Promise<any> {
    return axios.delete(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail (id, headers): Promise<any> {
    return axios.get(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async update (id, headers): Promise<any> {
    return axios.patch(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
  }

}
