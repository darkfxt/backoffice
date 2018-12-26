import {IImageDTO, ImageDTO} from '../dto/ImageDTO';

export interface IImageDAO {
  key: string;
  source: string;
  url: string;
}

export class ImageDAO implements IImageDAO {
  key: string;
  source: string;
  url: string;
  constructor(params: any = {}) {
    this.key = params.key || '';
    this.source = params.source || '';
    this.url = params.url || '';
  }

  static fitFromDTO (adaptees: ImageDTO[]) {
    const adapted = [];
    adaptees.forEach((adaptee) => {
      const params = {
        key : adaptee.key,
        source : adaptee.source,
        url : adaptee.url
      };
      adapted.push(new ImageDAO(params));
    });
    return adapted;
  }
}
