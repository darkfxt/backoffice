import axios from 'axios';
import {config} from '../../config/env';
import {AutocompleteResponse} from './autocomplete.entity';
import {Place} from '../entity/Place';


export class PlaceService {

  public static async create(): Promise<any> {

  }

  public static async autocomplete(query: string, lang: string = 'en'): Promise<AutocompleteResponse[]> {
    return axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?&key=${config.googleApiKey}&input=${query}&language=${lang}`)
      .then(resp => {
        return resp.data.predictions.map(item => new AutocompleteResponse(item.place_id, item.description));
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
