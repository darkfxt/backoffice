import axios from 'axios';
import {config} from '../../config/env';
import GooglePlace from '../entity/GooglePlace';
import {Autocomplete} from '../entity/Autocomplete';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import {PlaceFactory} from '../factories/place.factory';
import Place from '../entity/Place';


export class PlaceService {

  public static async getAll(query): Promise<any> {
    console.log(query);

    return axios
      .get(`${config.geo.url}/places?size=${query.size}&page=${query.page}`);
  }

  public static async create(body): Promise<any> {
    return axios.post(`${config.geo.url}/places`, body);
  }

  public static async glAutocomplete(query: string, lang: string = 'en'): Promise<Autocomplete[]> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=${config.googleApiKey}&input=${encodeURI(query)}&language=${lang}`)
      .then(resp => {
        return resp.data.predictions.map(item => new Autocomplete(item.place_id, item.description));
      });
  }

  public static async getDetail(place_id: string, lang: string = 'en'): Promise<Place> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?&key=${config.googleApiKey}&placeid=${place_id}&language=${lang}`)
      .then(resp => {
        return PlaceFactory.getPlaceFromGoogle(<GooglePlace>resp.data.result);
      });
  }

  public static async search(params, lang: string = 'en'): Promise<any> {
    const query: string[] = [];
    Object.entries(params).forEach(
      ([key, value]) => {
        if(key !== 'lang')
          query.push(`${key}=${value}`);
      }
    );

    return axios.get(`${config.geo.url}/places/search?${query.join('&')}`);

  }

  public static async update(id, body): Promise<any>{
    return axios.patch(`${config.geo.url}/places/${id}`, body);
  }

  private static async addPoint(placeId, lang): Promise<any>{
    const place: Place = await this.getDetail(placeId, lang);
    return this.create(place).then(resp => {
      place._id = resp.data.identifiers[0]._id;
      return {data: [place]};
    });
  }

}
