import axios from 'axios';
import {config} from '../../config/env';
import * as _ from 'lodash';
import { RoutesService } from './routes.service';
import { PlaceService } from './place.service';
import PlacesService = google.maps.places.PlacesService;
import {event_type} from '../entity/TripTemplate';

export class TripTemplateService {

  public static async getAll(query): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if(query.search){
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.routes.url}/trip-templates${queryParams}`);
  }

  public static async create(tripTemplate): Promise<any> {
    return axios.post(`${config.routes.url}/trip-templates`, tripTemplate);
  }

  public static async update(id, body): Promise<any> {
    return axios.patch(`${config.routes.url}/trip-templates/${id}`, body);
  }

  public static async getDetail(id: string, lang: string = 'en'): Promise<any> {
    return axios.get(`${config.routes.url}/trip-templates/${id}?lang=${lang}`);
  }

  public static async getEventsFromTripTemplate(id: string): Promise<any> {

    if(id && id !== 'undefined' && id !== 'new') {
      const answer = await axios.get(`${config.routes.url}/trip-templates/${id}/events`);
      const inflatedData = (await Promise.all(answer.data.map( async (event) => {
        let eventData: any;
        const geo = [];
        if (event['event_type'] === event_type.ACTIVITY || event['event_type'] === event_type.HOTEL){
          eventData = await PlaceService.getDetail(event.reference_id);
          geo.push(eventData.geo.point);
        }
        if(event['event_type'] === event_type.DRIVING) {
          eventData =  await RoutesService.getDetail(event.reference_id);
          geo.push(eventData.origin.geo.point);
          eventData['middle_points'].forEach(point => geo.push(point.geo.point));
          geo.push(eventData.destination.geo.point);
        }
        return Object.assign({}, event, {geo});
      }))).filter( event => event !== undefined);
      return inflatedData;
    }
    return [];
  }

}
