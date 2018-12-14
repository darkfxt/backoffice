export interface ICoordinates {
  lat: number;
  lng: number;
}

export class Coordinates implements ICoordinates {
  lat: number;
  lng: number;
  constructor(params: any = {}) {
    this.lat = params.lat || 0;
    this.lng = params.lng || 0;
  }
}
