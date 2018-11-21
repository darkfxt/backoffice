import axios from 'axios';
import { config } from '../../config/env';
import { AccountsService } from './accounts.service';
import GPXBuilder from '../../utils/GPXBuilder';
import BookingDTO from '../entity/dto/BookingDTO';

export class BookingService {
  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    return axios.get(`${config.routes.url}/bookings${queryParams}`, {headers: {authorization: headers.authorization}});
  }

  public static async create (body, headers): Promise<any> {
    if (typeof body.account_id !== 'number')
      body.account_id = body.account_id.id;
    const resp = await axios.post(`${config.routes.url}/bookings`, body, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async delete (id, headers): Promise<any> {
    return axios.delete(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail (id, headers): Promise<any> {
    const resp = await axios.get(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
    const account = await AccountsService.getDetail(resp.data.account_id, 'en', headers);
    resp.data.account_id = account.data;
    return resp;
  }

  public static async update (id, body, headers): Promise<any> {
    return axios.patch(`${config.routes.url}/bookings/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async getGPXContent(id, headers): Promise<string> {
    const booking = await axios.get(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
    return GPXBuilder.build(booking.data as BookingDTO);
  }

}
