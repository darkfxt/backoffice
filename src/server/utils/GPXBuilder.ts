import BookingDTO from '../api/entity/dto/BookingDTO';
import EventType from '../api/entity/enum/EventType';
import PlaceDTO from '../api/entity/dto/PlaceDTO';
import RouteDTO from '../api/entity/dto/RouteDTO';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class GPXBuilder {
  static build(booking: BookingDTO): string {

    let gpxContent = `<?xml version='1.0' encoding='utf-8'?>\n<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0" creator="TaylorGPS" xmlns="http://www.topografix.com/GPX/1/0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">`;
    let routes = '';
    let order = 0, routeIndex = 0, startDate: Date = new Date(booking.start_date);

    gpxContent = gpxContent.concat('\n<time>' + booking.start_date + '</time>');
    // Iterate over the booking structure and generate waypoints
    booking.days.forEach(day => {
      day.events.forEach(event => {
        switch (event.product.type) {
          case undefined: // FIXME No tiene que ser asi, deberiamos tener un type en cada evento de cada dia, para distinguir de que se trata. Ponerlo en el insert de un booking.
            const route: RouteDTO = event.product as RouteDTO;
            routes = routes.concat(this.initRoute(event.name, startDate, routeIndex++));
            /**
             * First, we must add every route waypoint to the first part of the GPX file
             * Second, we must create the route itself by joining the points with the
             * corresponding tags.
             * We must add origin, middle_point and destination as waypoints, respectively
             */

            // Route Origin
            order += 1;
            gpxContent = gpxContent
              .concat(this.addWaypoint(route.origin.name, route.origin.geo.point.lat, route.origin.geo.point.lng, order));
            routes = routes.concat(this.addRoutePoint(route.origin.name, route.origin.geo.point.lat, route.origin.geo.point.lng, order));

            // Route Middle points
            route.middle_points.forEach(point => {
              order += 1;
              gpxContent = gpxContent.concat(this.addWaypoint(point.name, point.geo.point.lat, point.geo.point.lng, order));
              routes = routes.concat(this.addRoutePoint(point.name, point.geo.point.lat, point.geo.point.lng, order));
            });

            // Route Destination
            order += 1;
            gpxContent = gpxContent
              .concat(this.addWaypoint(route.destination.name, route.destination.geo.point.lat, route.destination.geo.point.lng, order));
            routes = routes
              .concat(this.addRoutePoint(route.destination.name, route.destination.geo.point.lat, route.destination.geo.point.lng, order));

            // Close Route tag
            routes = routes.concat('\n</rte>');
            break;
          default:
            order += 1;
            const place: PlaceDTO = event.product as PlaceDTO;
            gpxContent = gpxContent.concat(this.addWaypoint(event.name, place.geo.point.lat, place.geo.point.lng, order));
            break;
        }
      });
      startDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000));
    });
    gpxContent = gpxContent.concat(routes);
    gpxContent = gpxContent.concat('\n</gpx>');
    return gpxContent;
  }

  private static addWaypoint(name: string, lat: number, lon: number, order: number): string {
    return '\n<wpt lat="' + lat + '" lon="' + lon + '"><name>(' + order + ') ' + this.convertInvalidStrings(name) + '</name></wpt>';
  }

  private static initRoute(name: string, date: Date, index: number): string {
    return '\n<rte>\n<name>' + index + ') ' + date.getDate() + '/' + monthNames[date.getMonth() - 1] + '/' + date.getFullYear().toString().substr(-2) + ' - ' + this.convertInvalidStrings(name) + '</name>';
  }

  private static addRoutePoint(name: string, lat: number, lon: number, order: number): string {
    return '\n<rtept lat="' + lat + '" lon="' + lon + '"><name>( ' + order + ' ) ' + this.convertInvalidStrings(name) + '</name></rtept>';
  }

  private static convertInvalidStrings(name: string): string {
    return name.replace('&', 'and').replace('<', 'lt').replace('>', 'gt');
  }

}

export default GPXBuilder;
