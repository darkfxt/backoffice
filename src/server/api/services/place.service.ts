import axios from 'axios';
import { config } from '../../config/env';
import GooglePlace from '../entity/GooglePlace';
import { Autocomplete } from '../entity/Autocomplete';
import { until } from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import { PlaceFactory } from '../factories/place.factory';
import Place from '../entity/Place';


export class PlaceService {

  public static async getAll(query, headers): Promise<any> {
    return axios
      .get(`${config.geo.url}/places`, {params: query, headers});
  }

  public static async create(body, headers: any): Promise<any> {
    const ret = await axios.post(`${config.geo.url}/places`, body, {headers});
    return ret;
  }

  public static async update(id, body, headers: any): Promise<any> {
    return axios.patch(`${config.geo.url}/places/${id}`, body, {headers});
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
      .get(`${config.geo.url}/places/${place_id}`, {headers})
      .then(resp => {
        return resp.data;
      });
  }

  public static async deleteOne(place_id: string, headers: any): Promise<any> {
    return axios
      .delete(`${config.geo.url}/places/${place_id}`, {headers});
  }

  public static async search(params, lang: string = 'en', headers: any): Promise<any> {
    const query: string[] = [];
    Object.entries(params).forEach(
      ([key, value]) => {
        if (key !== 'lang')
          query.push(`${key}=${value}`);
      }
    );
    return axios.get(`${config.geo.url}/places/search?${query.join('&')}`, {headers});
  }

}
