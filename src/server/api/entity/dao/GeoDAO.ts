import { CoordinatesDTO } from '../dto/CoordinatesDTO';

export interface IGeoDAO {
  center: ICoordinatesDAO;
  geometry: IGeometryDAO;
}

export interface IGeometryDAO {
  type: string;
  point: Array<number>;
  multipoint: number [] [];
  polygon: number [] [] [];
  multipolygon: number [] [] [] [];
}

export interface ICoordinatesDAO {
  longitude: number;
  latitude: number;
}

export class GeoDAO implements IGeoDAO {
  center: CoordinatesDAO;
  geometry: GeometryDAO;
  constructor(params: any = {}) {
    this.center = params.center || new CoordinatesDAO();
    this.geometry = params.geometry || new GeometryDAO();
  }
}

export class CoordinatesDAO implements ICoordinatesDAO {
  latitude: number;
  longitude: number;
  constructor(params: any = {}) {
    this.latitude = params.latitude || '';
    this.longitude = params.longitude || '';
  }

  static fitFromDTO(point: CoordinatesDTO) {
    return new CoordinatesDAO({latitude: point.lat, longitude: point.lng});
  }
}

export class GeometryDAO implements IGeometryDAO {
  multipoint: number[][];
  multipolygon: number[][][][];
  point: Array<number>;
  polygon: number[][][];
  type: string;
  constructor(params: any = {}) {
    this.multipoint = params.multipoint || [[]];
    this.multipolygon = params.multipolygon || [[[[]]]];
    this.point = params.point || [];
    this.polygon = params.polygon || [[[]]];
    this.type = params.Type;
  }
}
