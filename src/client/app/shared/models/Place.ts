import {Shape} from './Shape';

export class Place {
  _id: string;
  name: string;
  description: string;
  type: string;
  geo: Shape;
  images: string[];
}
