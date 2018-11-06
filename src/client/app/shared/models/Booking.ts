import { DayOfTrip, TripTemplate } from './TripTemplate';

export class Booking extends TripTemplate {
  passenger_name: string;
  account_id: number;
  startDate: Date;
  endDate: Date;
  comment: string;
  status: string;
  gps_device: GPSDevice;
}

export class GPSDevice {

  id: string;
  pick_up: string;
  drop_off: string;
}
