import BookingDTO from '../entity/dto/BookingDTO';
import DayOfTripDTO from '../entity/dto/DayOfTripDTO';
import { config } from '../../config/env';

const eventTypes = {
  driving: 'Driving',
  destination: 'Destination',
  hotel: 'Hotel',
  terminal: 'Terminal',
  point_of_interest: 'Point of interest',
  activity: 'Activity'
};

class DayOfTrip {
  constructor(
    public date: Date,
    public events = []
  ) {}
}

interface Event {
  type;
  title;
  description;
  meta?;
}

export class ItineraryFactory {

  header;
  itinerary;
  basePath;

  constructor(booking: BookingDTO) {
    this.basePath = config.env !== 'production' ? 'dev.appv2.taylorgps.com' : 'appv2.taylorgps.com';
    this.header = {
      id: booking._id,
      name: booking.name,
      passenger_name: (<any>booking).passenger_name,
      start_date: (<any>booking.start_date).substr(0, 10).split('-').reverse().join('/'),
      end_date: (<any>booking.end_date).substr(0, 10).split('-').reverse().join('/'),
      booking_reference: booking.booking_reference,
      comment: booking.comment,
      gps: booking.gps_device,
      account: booking.account_id,
      reference: booking.booking_reference
    };
    this.itinerary = this.transformItinerary(booking.days, booking.start_date);
  }

  private transformItinerary(itinerary: DayOfTripDTO[], startDate: Date) {
    return itinerary.map((day: any, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + index);
      day.date = currentDate.toJSON();
      day.events = day.events.map(event => this.transformEvent(event));
      return day;
    });
  }

  private transformEvent(event) {
    switch (event.event_type) {
      case 'driving':
        const meta = {
          ...calculateDistanceAndTime(event.product.legs),
          ...{highlights: event.product.middle_points
              .filter(point => point.type !== 'waypoint')
              .map(point => point.name)
          },
          product: event.product
        };
        return <Event>{
          title: event.name,
          description: event.product.description,
          type: event.product.route_type.toLowerCase(),
          meta: meta
        };
      default:
        return <Event>{
          title: event.product.name,
          description: event.product.description,
          type: eventTypes[event.product.type]
        };
    }

    function calculateDistanceAndTime(legs) {
      let distance = 0;
      let avgTime = 0;
      legs.forEach(leg => {
        distance += leg.distance.value / 1000;
        avgTime += leg.duration.value;
      });
      return {distance: Math.floor(distance), avgTime: getDuration(avgTime)};
    }

    function getDuration(seconds) {
      const minutes = seconds / 60;
      const h = Math.floor(minutes / 60);
      const m = Math.floor(minutes % 60);
      return {hours: h, minutes: m};
    }
  }

}
