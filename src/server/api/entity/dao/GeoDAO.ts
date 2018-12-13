export interface GeoDAO {
  center: CoordinatesDAO;
  geometry: GeometryDAO;
}

export interface GeometryDAO {
  type: string;
  point: Array<number>;
  multipoint: number [] [];
  polygon: number [] [] [];
  multipolygon: number [] [] [] [];
}

export interface CoordinatesDAO {
  longitude: number;
  latitude: number;
}
