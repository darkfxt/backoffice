import EventType from '../enum/EventType';

interface ProductDTO {
  _id: string;
  name: string;
  type: EventType;
  company_id: number;
  created_by: string;
}

export default ProductDTO;
