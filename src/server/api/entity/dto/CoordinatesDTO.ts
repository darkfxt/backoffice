import ICoordinatesDTO from './ICoordinatesDTO';

export class CoordinatesDTO implements ICoordinatesDTO {
  lat: number;
  lng: number;
  constructor(latitude, longitude){
    this.lat = latitude;
    this.lng = longitude;
  }
}
