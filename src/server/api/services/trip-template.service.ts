import axios from 'axios';
import { config } from '../../config/env';
import * as _ from 'lodash';
import { RoutesService } from './routes.service';
import { PlaceService } from './place.service';
import PlacesService = google.maps.places.PlacesService;
import { event_type } from '../entity/TripTemplate';
import event = google.maps.event;

export class TripTemplateService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    return axios
      .get(`${config.routes.url}/trip-templates${queryParams}`, {headers: {authorization: headers.authorization}});
  }

  public static async create(tripTemplate, headers: any): Promise<any> {
    return axios.post(`${config.routes.url}/trip-templates`, tripTemplate, {headers: {authorization: headers.authorization}});
  }

  public static async update(id, body, headers: any): Promise<any> {
    return axios.patch(`${config.routes.url}/trip-templates/${id}`, body, {headers: {authorization: headers.authorization}});
  }

  public static async deleteOne(id, headers: any): Promise<any> {
    return axios.delete(`${config.routes.url}/trip-templates/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers: any): Promise<any> {
    return axios.get(`${config.routes.url}/trip-templates/${id}?lang=${lang}`, {headers: {authorization: headers.authorization}});
  }

  public static async getEventsFromTripTemplate(id: string, headers: any): Promise<any> {

    if (id && id !== 'undefined' && id !== 'new') {
      const answer = await axios.get(`${config.routes.url}/trip-templates/${id}/events`);
      // tslint:disable-next-line:no-shadowed-variable
      const inflatedData = (await Promise.all(answer.data.map( async (event) => {
        let eventData: any;
        const geo = [];
        if (event['event_type'] === event_type.ACTIVITY || event['event_type'] === event_type.HOTEL) {
          eventData = await PlaceService.getDetail(event.reference_id, headers);
          geo.push(eventData.geo.point);
        }
        if (event['event_type'] === event_type.DRIVING) {
          eventData =  await RoutesService.getDetail(event.reference_id, headers);
          geo.push({origin: eventData.origin, middle_points: eventData['middle_points'], destination: eventData.destination});
          // geo.push(eventData.origin.geo.point);
          // eventData['middle_points'].forEach(point => geo.push(point.geo.point));
          // geo.push(eventData.destination.geo.point);
        }
        return Object.assign({}, event, {geo}, {referencedObject: eventData});
      }))).filter( event => event !== undefined); // tslint:disable-line
      return inflatedData;
    }
    return [];
  }

  public static async search(params, lang: string = 'en'): Promise<any> {
    const query: string[] = [];
    Object.entries(params).forEach(
      ([key, value]) => {
        if (key !== 'lang')
          query.push(`${key}=${value}`);
      }
    );

    return axios.get(`${config.routes.url}/trip-templates/autocomplete?${query.join('&')}`);

  }

}
