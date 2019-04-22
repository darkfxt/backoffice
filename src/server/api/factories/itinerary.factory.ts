import BookingDTO from '../entity/dto/BookingDTO';
import DayOfTripDTO from '../entity/dto/DayOfTripDTO';
import { config } from '../../config/env';
import { i18n } from '../../i18n';
import { ContentService } from '../services/content.service';

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
  i18n;
  lang;
  reqHeaders;

  async get(booking: BookingDTO, lang = 'en', reqHeaders) {
    this.basePath = config.env !== 'production' ? 'dev.appv2.taylorgps.com' : 'appv2.taylorgps.com';
    this.reqHeaders = reqHeaders;
    this.i18n = i18n[lang];
    this.lang = lang;
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
    this.itinerary = await this.transformItinerary(booking.days, booking.start_date);

    return this;
  }

  private async transformItinerary(itinerary: DayOfTripDTO[], startDate: Date) {
    return await Promise.all(itinerary.map(async (day: any, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + index);
      day.date = currentDate.toJSON();
      day.events = await Promise.all(day.events.map( event =>  this.transformEvent(event)));
      return day;
    })
    );
  }

  private async transformEvent(event) {
    switch (event.event_type) {
      case 'driving' || 'walking':
        const productContent = await ContentService.getContent('routes', event.product._id, this.reqHeaders);
        event.product.things_to_know = productContent.data.things_to_know;
        const meta = {
          ...calculateDistanceAndTime(event.product.legs),
          ...{highlights: event.product.middle_points
              .filter(point => point.type !== 'waypoint')
              .map(point => point.name)
          },
          product: event.product
        };
        return <Event>{
          title: event.product.name,
          description: productContent.data.description,
          type: i18n[this.lang][event.product.route_type.toLowerCase()],
          meta: meta
        };
      case 'place':
        const placeConent = await ContentService.getContent('places', event.product._id, this.reqHeaders);
        return <Event>{
          title: event.product.name,
          description: placeConent.data.description,
          type: i18n[this.lang][event.product.type]
        };
      default:
        return <Event>{
          title: event.product.name,
          description: event.product.description,
          type: event.product.type
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

  private async getProductContent(id, type): Promise<any> {
    return ContentService.getContent(id, type, this.reqHeaders);
  }

}
