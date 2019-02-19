import { IPlaceDTO } from '../dto/IPlaceDTO';
import { IPlaceDAO } from '../dao/IPlaceDAO';
import Place from '../Place';
import { PlaceDAO } from '../dao/PlaceDAO';
import { PlaceDTO } from '../dto/PlaceDTO';
import { CoordinatesDTO } from '../dto/CoordinatesDTO';
import { GeoDTO } from '../dto/GeoDTO';
import { AddressDTO } from '../dto/AddressDTO';
import { CoordinatesDAO, GeoDAO } from '../dao/GeoDAO';
import { AddressDAO } from '../dao/AddressDAO';
import { ImageDAO } from '../dao/ImageDAO';
import { PlaceType } from '../enum/PlaceType';
import {IPlaceMetadataDAO} from '../dao/IPlaceMetadataDAO';
import {PlaceMetadataDTO} from '../dto/PlaceMetadataDTO';

export class PlaceAdapter {
  static fitToDAO(DTOData: IPlaceDTO): PlaceDAO {
    const transformed = new PlaceDAO();
    transformed._id = DTOData._id;
    transformed.name = DTOData.name;
    transformed.description = DTOData.description;
    transformed.search_name = DTOData.search_name;
    transformed.status = DTOData.status;
    transformed.type = DTOData.type;
    transformed.created_by = DTOData.created_by;
    transformed.company_id = DTOData.company_id;
    transformed.default_lang = DTOData.default_lang;
    transformed.geo = new GeoDAO({center: CoordinatesDAO.fitFromDTO(DTOData.geo.point)});
    transformed.address = AddressDAO.fitFromDTO(DTOData.geo.address);
    transformed.images = ImageDAO.fitFromDTO(DTOData.images);
    if (DTOData.place_id) transformed.place_id = DTOData.place_id;

    return transformed;
  }

  static fitFromDAO(DAOData: IPlaceDAO): PlaceDTO {
    const transformed = new PlaceDTO;
    transformed._id = DAOData._id;
    transformed.name = DAOData.name;
    transformed.description = DAOData.description;
    transformed.search_name = DAOData.search_name;
    transformed.status = DAOData.status;
    transformed.type = DAOData.type;
    transformed.default_lang = DAOData.default_lang;
    const point = new CoordinatesDTO(DAOData.geo.center.latitude, DAOData.geo.center.longitude);
    const address = new AddressDTO(DAOData.address);
    transformed.geo = new GeoDTO(address, ' ', point);
    transformed.images = DAOData.images || [];
    transformed.created_by = DAOData.created_by;
    if (DAOData.place_id) transformed.place_id = DAOData.place_id;
    return transformed;
  }

  static fitMetadataFromDAO(DAOData: IPlaceMetadataDAO): PlaceMetadataDTO {
    const transformed = new PlaceMetadataDTO();
    transformed.pageIndex = DAOData.page_index;
    transformed.pageSize = DAOData.page_size;
    transformed.filter = DAOData.filter;
    transformed.length = DAOData.length;
    return transformed;
  }
}

