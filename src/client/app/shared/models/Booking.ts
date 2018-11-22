import { DayOfTrip, TripTemplate } from './TripTemplate';

export class Booking extends TripTemplate {
  passenger_name: string;
  account_id: number;
  startDate: Date;
  endDate: Date;
  booking_reference: string;
  comment: string;
  status: Status;
  gps_device?: GPSDevice;
}

export class GPSDevice {

  id: string;
  name: string;
  pick_up: string;
  drop_off: string;
}

export enum Status {
  'DRAFT',
  'PUBLISHED',
  'CANCELED'
}
