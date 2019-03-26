import { PlaceAdapter } from './PlaceAdapter';
import { Request } from 'express';
import Route from '../Route';
import { CoordinatesDAO, GeoDAO } from '../dao/GeoDAO';

export class RouteTransformer {

  static toDTO(dto) {
    dto.search_name = dto.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (dto.destination) {
      if (dto.destination.geo.address) dto.destination.address = dto.destination.geo.address;
      dto.destination.geo = {center: CoordinatesDAO.fitFromDTO(dto.destination.geo.point)};
    }
    if (dto.origin) {
      if (dto.origin.geo.address) dto.origin.address = dto.origin.geo.address;
      dto.origin.geo = {center: CoordinatesDAO.fitFromDTO(dto.origin.geo.point)};
    }
    if (dto.referencedOrigin) dto.referencedOrigin.geo = {center: CoordinatesDAO.fitFromDTO(dto.referencedOrigin.geo.point)};
    if (dto.referencedDestination) dto.referencedDestination.geo = {center: CoordinatesDAO.fitFromDTO(dto.referencedDestination.geo.point)};
    dto.middle_points = dto.middle_points.map(place => {
      place.geo = {center: CoordinatesDAO.fitFromDTO(place.geo.point)};
      return place;
    });

    return dto;
  }

  static toRoute (dto): Route {
    dto.origin = dto.origin ? PlaceAdapter.fitFromDAO(dto.origin) : null;
    dto.destination = dto.destination ? PlaceAdapter.fitFromDAO(dto.destination) : null;
    dto.referencedOrigin = dto.referencedOrigin ? PlaceAdapter.fitFromDAO(dto.referencedOrigin) : null;
    dto.referencedDestination = dto.referencedDestination ? PlaceAdapter.fitFromDAO(dto.referencedDestination) : null;
    dto.middle_points = dto.middle_points.map(PlaceAdapter.fitFromDAO);

    return dto;
  }

}

