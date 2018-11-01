import { DayOfTrip } from './TripTemplate';

export class Booking {
  _id: string;
  name: string;
  paxName: string;
  startDate: Date;
  endDate: Date;
  notes: string;
  itinerary: Itinerary;
  status: string;
  gpsId: string;
}

export class Itinerary {
  days: DayOfTrip[];
}
