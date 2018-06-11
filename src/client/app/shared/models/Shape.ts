import {Address} from './Address';
import {Coordinates} from './Coordinates';

export class Shape {
  polygon: Coordinates[];
  line: Coordinates[];
  point: Coordinates;
  address: Address;
  elevation: string;
}
