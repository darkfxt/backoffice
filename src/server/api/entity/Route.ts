
export class Leg {
  distance: any;
  duration: any;
}

export class ThingToKnow {
  title: string;
  description: string;

}

export class Point {
  lat: number;
  lng: number;
}

export default class Route {

  constructor(
    public _id: string,
    public name: string,
    private search_name: string,
    public route_type: string,
    public road_surface: string,
    public via: string,
    public description: string,
    public images: any[],
    public origin: Point,
    public destination: Point,
    public middle_points: Point[],
    public things_to_know: ThingToKnow[],
    public legs: Leg[],
    public company_id: number
  ) {

  }
}
