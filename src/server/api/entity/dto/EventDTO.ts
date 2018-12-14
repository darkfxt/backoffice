import EventType from '../enum/EventType';
import IProductDTO from './IProductDTO';

interface EventDTO {
  _id: string;
  dayId: string;
  name: string;
  description: string;
  eventType: EventType;
  time: Date;
  order: number;
  product?: IProductDTO;
  company_id: number;
  color: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export default EventDTO;
