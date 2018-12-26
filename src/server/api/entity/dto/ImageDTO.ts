export interface IImageDTO {
  source: string;
  url: string;
  key?: string;
}

export class ImageDTO implements IImageDTO {
  key?: string;
  source: string;
  url: string;
  constructor(params: any = {}) {
    this.key = params.key || '';
    this.source = params.source || '';
    this.url = params.url || '';
  }
}
