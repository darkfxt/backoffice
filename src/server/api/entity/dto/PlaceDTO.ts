import CoordinatesDTO from './CoordinatesDTO';
import ProductDTO from './ProductDTO';
import ImageDTO from './ImageDTO';

interface PlaceDTO extends ProductDTO {
  description: string;
  geo: CoordinatesDTO;
  images: Array<ImageDTO>;
}

export default PlaceDTO;
