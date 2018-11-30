import BookingDTO from '../entity/dto/BookingDTO';
import DayOfTripDTO from '../entity/dto/DayOfTripDTO';
import { config } from '../../config/env';

const eventTypes = {
  POI: 'Highlight',
  ACTIVITY: 'Activity',
  REFERENCE: 'Destination',
  HOTEL: 'Hotel',
  TERMINAL: 'Terminal',
  DRIVING: 'Driving'
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
      end_date: booking.end_date ? booking.end_date.toJSON().substr(0, 10).split('-').reverse().join('/') : ''
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
    switch (event.eventType) {
      case 'DRIVING':
        const meta = {
          ...calculateDistanceAndTime(event.product.legs),
          ...{things_to_know: event.product.things_to_know},
          ...{highlights: event.product.middle_points
              .filter(point => point.type !== 'WAYPOINT')
              .map(point => point.name)
          },
          via: event.product.via,
        };
        return <Event>{
          title: event.name,
          description: event.product.description,
          type: eventTypes[event.eventType],
          meta: meta
        };
      default:
        return <Event>{
          title: event.product.name,
          description: event.product.description,
          type: eventTypes[event.eventType]
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
