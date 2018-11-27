import CoordinatesDTO from './CoordinatesDTO';
import ProductDTO from './ProductDTO';

interface PlaceDTO extends ProductDTO {
  description: string;
  geo: CoordinatesDTO;
  image: string;
}

export default PlaceDTO;
