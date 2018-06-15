import axios from 'axios';
import {config} from '../../config/env';
import {Place} from '../entity/Place';
import {Autocomplete} from '../entity/Autocomplete';


export class PlaceService {

  public static async create(body): Promise<any> {
    return axios.post(`${config.geo.url}/places`, body);
  }

  public static async autocomplete(query: string, lang: string = 'en'): Promise<Autocomplete[]> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=${config.googleApiKey}&input=${encodeURI(query)}&language=${lang}`)
      .then(resp => {
        return resp.data.predictions.map(item => new Autocomplete(item.place_id, item.description));
      });
  }

  public static async getDetail(place_id: string, lang: string = 'en'): Promise<any> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?&key=${config.googleApiKey}&placeid=${place_id}&language=${lang}`)
      .then(resp => new Place(
          resp.data.result.place_id,
          resp.data.result.name,
          resp.data.result.geometry.location,
          resp.data.result.photos,
          resp.data.result.formatted_address)
      );
  }

}
