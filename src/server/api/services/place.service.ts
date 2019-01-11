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
import { PlaceType } from '../entity/enum/PlaceType';


export class PlaceService {

  public static async getAll(query, headers): Promise<any> {
    const resp = await axios
      .get(`${config.geo.url}/places`, {params: query, headers: {authorization: headers.authorization}});
    resp.data.data = resp.data.data.map((place) => PlaceAdapter.fitFromDAO(place));
    return resp;
  }

  public static async create(body: IPlaceDTO, headers: any): Promise<any> {
    const PlaceDAOInstance = PlaceAdapter.fitToDAO(body);
    try {
      const ret = await axios.post(`${config.geo.url}/places`, PlaceDAOInstance, {headers: {authorization: headers.authorization}});
      return PlaceAdapter.fitFromDAO(ret.data);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(id, body, headers: any): Promise<any> {
    const PlaceDAOInstance = PlaceAdapter.fitToDAO(body);
    const res = await axios.put(`${config.geo.url}/places/${id}`, PlaceDAOInstance, {headers: {authorization: headers.authorization}});
    return PlaceAdapter.fitFromDAO(res.data);
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
    const dataPromises = [
      axios.get(`${config.content.url}/places/${place_id}`, {headers: {authorization: headers.authorization}}),
      axios.get(`${config.geo.url}/places/${place_id}`, {headers: {authorization: headers.authorization}})
    ];
    const [contentResponse, placesResponse] = await Promise.all(dataPromises);

    const adaptedResponse = PlaceAdapter.fitFromDAO(placesResponse.data);
    adaptedResponse.description = contentResponse.data.description;

    return adaptedResponse;

    /*return axios
      .get(`${config.geo.url}/places/${place_id}`, {headers: {authorization: headers.authorization}})
      .then(resp => {
        return PlaceAdapter.fitFromDAO(resp.data);
      });*/
  }

  public static async deleteOne(place_id: string, headers: any): Promise<any> {
    const resp = await axios
      .delete(`${config.geo.url}/places/${place_id}`, {headers: {authorization: headers.authorization}});
    return resp;
  }

  public static async search(search: string,
                             public_types: Array<PlaceType>,
                             private_types: Array<PlaceType>,
                             company_id: number,
                             limit: number = 50,
                             lang: string = 'en',
                             headers: any): Promise<any> {
    const resp = await axios.get(`${config.geo.url}/autocomplete?search=${search}` +
                                     `&public_types=${public_types.join(',')}` +
                                     `&private_types=${private_types.join(',')}` +
                                     `&company_id=${company_id}&limit=${limit}`,
                                {headers: {authorization: headers.authorization}});
    return resp.data.map((option) => PlaceAdapter.fitFromDAO(option));
  }

}

