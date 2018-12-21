import axios from 'axios';
import { config } from '../../config/env';
import { AccountsService } from './accounts.service';
import GPXBuilder from '../../utils/GPXBuilder';
import BookingDTO from '../entity/dto/BookingDTO';
import { PlaceAdapter } from '../entity/adapters/PlaceAdapter';

export class BookingService {
  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    const resp = await axios.get(`${config.routes.url}/bookings${queryParams}`, {headers: {authorization: headers.authorization}});
    resp.data.data = resp.data.data.map((booking) => {
      booking.days = this.fitMassiveDaysFromDAO(booking);
      return booking;
    });
    return resp;
  }

  public static async create (body, headers): Promise<any> {
    if (typeof body.account_id !== 'number')
      body.account_id = body.account_id.id;
    body.days = this.fitDaysToDAO(body);
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
    resp.data.days = this.fitDaysFromDAO(resp);
    return resp;
  }

  public static async update (id, body, headers): Promise<any> {
    body.days = this.fitDaysToDAO(body);
    return axios.patch(`${config.routes.url}/bookings/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async getGPXContent(id, headers): Promise<string> {
    const booking = await axios.get(`${config.routes.url}/bookings/${id}`, {headers: {authorization: headers.authorization}});
    booking.data.days = this.fitDaysToDAO(booking.data);
    return GPXBuilder.build(booking.data as BookingDTO);
  }

  private static fitDaysToDAO(tripTemplate) {
    return tripTemplate.days.map((day) => {
      day.events = day.events.map((myEvent) => {
        if (myEvent.event_type === 'place')
          myEvent.product = PlaceAdapter.fitToDAO(myEvent.product);
        return myEvent;
      });
      return day;
    });
  }

  private static fitDaysFromDAO(resp) {
    return resp.data.days.map((day) => {
      day.events = day.events.map((myEvent) => {
        if (myEvent.event_type === 'place')
          myEvent.product = PlaceAdapter.fitFromDAO(myEvent.product);
        return myEvent;
      });
      return day;
    });
  }

  private static fitMassiveDaysFromDAO(tripT) {
    if (tripT.days && tripT.days.length > 0) {
      return tripT.days.map((day) => {
        day.events = day.events.map((myEvent) => {
          if (myEvent.event_type === 'place')
            myEvent.product = PlaceAdapter.fitFromDAO(myEvent.product);
          return myEvent;
        });
        return day;
      });
    }
    return tripT;
  }

}
