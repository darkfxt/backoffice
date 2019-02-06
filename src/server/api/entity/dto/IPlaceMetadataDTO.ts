import { IPlaceFiltersDAO } from '../dao/IPlaceMetadataDAO';

export interface IPlaceMetadataDTO {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
  search?: string;
  sort?: string;
  orderBy?: string;
  types?: Array<string>;
  filter?: IPlaceFiltersDAO;
}
