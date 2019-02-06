import { IPlaceMetadataDTO } from './IPlaceMetadataDTO';
import { IPlaceFiltersDAO } from '../dao/IPlaceMetadataDAO';

export class PlaceMetadataDTO implements IPlaceMetadataDTO {
  length: number;
  orderBy: string;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
  search: string;
  sort: string;
  types: Array<string>;
  filter: IPlaceFiltersDAO;

}
