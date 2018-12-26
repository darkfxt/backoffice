import axios from 'axios';
import { config } from '../../config/env';
import { RoutesService } from './routes.service';
import { PlaceService } from './place.service';
import { event_type } from '../entity/TripTemplate';
import { PlaceAdapter } from '../entity/adapters/PlaceAdapter';
import { RouteTransformer } from '../entity/adapters/route.transformer';

export class TripTemplateService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search)
      queryParams += `&search=${query.search}`;
    if (query.company_id)
      queryParams += `&company_id=${query.company_id}`;
    const resp = await axios
      .get(`${config.routes.url}/trip-templates${queryParams}`, {headers: {authorization: headers.authorization}});
    resp.data.data = resp.data.data.map((tripTemplate) => {
      tripTemplate.days = this.fitMassiveDaysFromDAO(tripTemplate);
      return tripTemplate;
    });

    return resp;
  }

  public static async create(tripTemplate, headers: any): Promise<any> {
    tripTemplate.days = this.fitDaysToDAO(tripTemplate);
    return axios.post(`${config.routes.url}/trip-templates`, tripTemplate, {headers: {authorization: headers.authorization}});
  }

  public static async update(id, tripTemplate, headers: any): Promise<any> {
    tripTemplate.days = this.fitDaysToDAO(tripTemplate);
    return axios.patch(`${config.routes.url}/trip-templates/${id}`, tripTemplate, {headers: {authorization: headers.authorization}});
  }

  public static async deleteOne(id, headers: any): Promise<any> {
    return axios.delete(`${config.routes.url}/trip-templates/${id}`, {headers: {authorization: headers.authorization}});
  }

  public static async getDetail(id: string, lang: string = 'en', headers: any): Promise<any> {
    const resp = await axios.get(
      `${config.routes.url}/trip-templates/${id}?lang=${lang}`,
      {headers: {authorization: headers.authorization}});
    resp.data.days = this.fitDaysFromDAO(resp);
    return resp;
  }

  public static async getEventsFromTripTemplate(id: string, headers: any): Promise<any> {

    if (id && id !== 'undefined' && id !== 'new') {
      const answer = await axios.get(`${config.routes.url}/trip-templates/${id}/events`);
      // tslint:disable-next-line:no-shadowed-variable
      const inflatedData = (await Promise.all(answer.data.map( async (event) => {
        let eventData: any;
        const geo = [];
        if (event['event_type'] === event_type.PLACE) {
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

  public static async search(params, lang: string = 'en', headers): Promise<any> {
    const query: any = Object.assign(params);
    Reflect.deleteProperty(query, 'lang');

    return axios.get(`${config.routes.url}/trip-templates/autocomplete`, {params: query, headers: {authorization: headers.authorization}});

  }

  private static fitDaysToDAO(tripTemplate) {
    return tripTemplate.days.map((day) => {
      day.events = day.events.map((myEvent) => {
        if (myEvent.event_type === 'place')
          myEvent.product = PlaceAdapter.fitToDAO(myEvent.product);
        if (myEvent.event_type === 'driving')
          myEvent.product = RouteTransformer.toDTO(myEvent.product);
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
        if (myEvent.event_type === 'driving')
          myEvent.product = RouteTransformer.toRoute(myEvent.product);
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
          if (myEvent.event_type === 'driving')
            myEvent.product = RouteTransformer.toRoute(myEvent.product);
          return myEvent;
        });
        return day;
      });
    }
    return tripT.days;
  }

}
