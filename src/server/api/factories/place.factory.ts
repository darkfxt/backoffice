import Place from '../entity/Place';
import GooglePlace, {AddressComponent} from '../entity/GooglePlace';
import {config} from '../../config/env';

export class PlaceFactory{

  static getPlaceFromGoogle(glPlace: GooglePlace): Place{
    const place: Place = new Place();
    place.place_id = glPlace.place_id;
    place.name = glPlace.name;
    place.description = '';
    place.status = 1;
    place.type = 'POI';
    place.geo = {
      point: glPlace.geometry.location,
      address: {
        country_code: getAddressName(glPlace.address_components, 'country', 'short_name'),
        country: getAddressName(glPlace.address_components, 'country'),
        locality: getAddressName(glPlace.address_components, 'locality'),
        region: getAddressName(glPlace.address_components, 'administrative_area_level_1'),
        postalCode: getAddressName(glPlace.address_components, 'postal_code'),
        route: getAddressName(glPlace.address_components, 'route'),
        street_number: getAddressName(glPlace.address_components, 'street_number'),
        formatted_address: glPlace.formatted_address
      }
    };
    place.images = [];
    glPlace.photos.forEach(value => {
      place.images.push({
        source: 'google_place',
        sizes: [
          {
            size: 'thumbnail',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${value.photo_reference}&key=${config.googleApiKey}`
          },
          {
            size: 'small',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${value.photo_reference}&key=${config.googleApiKey}`
          },
          {
            size: 'large',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${value.photo_reference}&key=${config.googleApiKey}`
          },
          {
            size: 'original',
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${value.width}&photoreference=${value.photo_reference}&key=${config.googleApiKey}`
          }
        ]
      });
    });

    return place;

  function getAddressName(componentList: AddressComponent[], type: string, label = 'long_name'): string{
      const component = componentList.filter(value  => value.types.indexOf(type) > -1)[0];
      return component? component[label] : '';
    }
  }
}
