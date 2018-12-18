import axios from 'axios';
import { config } from '../../config/env';
import GooglePlace from '../entity/GooglePlace';
import { Autocomplete } from '../entity/Autocomplete';
import { until } from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import { PlaceFactory } from '../factories/place.factory';
import Place from '../entity/Place';
import { IPlaceDTO } from '../entity/dto/IPlaceDTO';
import { PlaceAdapter } from '../entity/adapters/PlaceAdapter';


export class PlaceService {

  public static async getAll(query, headers): Promise<any> {
    const resp = await axios
      .get(`${config.geo.url}/places`, {params: query, headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async create(body: IPlaceDTO, headers: any): Promise<any> {
    const PlaceDAOInstance = PlaceAdapter.fitToDAO(body);
    const ret = await axios.post(`${config.geo.url}/places`, PlaceDAOInstance, {headers: {authorization: headers.authorization}});
    return PlaceAdapter.fitFromDAO(ret.data);
  }

  public static async update(id, body, headers: any): Promise<any> {
    const PlaceDAOInstance = PlaceAdapter.fitToDAO(body);
    return axios.put(`${config.geo.url}/places/${id}`, PlaceDAOInstance, {headers: {authorization: headers.authorization}});
  }

  public static async glAutocomplete(query: string, lang: string = 'en'): Promise<Autocomplete[]> {
    return axios
      // tslint:disable-next-line:max-line-length
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=${config.googleApiKey}&input=${encodeURI(query)}&language=${lang}`)
      .then(resp => {
        return resp.data.predictions.map(item => new Autocomplete(item.place_id, item.description));
      });
  }

  public static async getGoogleDetail(place_id: string, lang: string = 'en'): Promise<Place> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?&key=${config.googleApiKey}&placeid=${place_id}&language=${lang}`)
      .then(resp => {
        return PlaceFactory.getPlaceFromGoogle(<GooglePlace>resp.data.result);
      });
  }

  public static async getDetail(place_id: string, headers: any, lang: string = 'en'): Promise<Place> {
    return axios
      .get(`${config.geo.url}/places/${place_id}`, {headers: {authorization: headers.authorization}})
      .then(resp => {
        return PlaceAdapter.fitFromDAO(resp.data);
      });
  }

  public static async deleteOne(place_id: string, headers: any): Promise<any> {
    const resp = await axios
      .delete(`${config.geo.url}/places/${place_id}`, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async search(params, lang: string = 'en', headers: any): Promise<any> {
    const query: string[] = [];
    Object.entries(params).forEach(
      ([key, value]) => {
        if (key !== 'lang')
          query.push(`${key}=${value}`);
      }
    );
    const resp = await axios.get(`${config.geo.url}/places?limit=10&page=1&search=${params.q}`, {headers: {authorization: headers.authorization}});
    return resp.data.data.map((option) => PlaceAdapter.fitFromDAO(option));
  }

}
