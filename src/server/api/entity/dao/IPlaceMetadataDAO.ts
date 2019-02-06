export interface IPlaceMetadataDAO {
  filter: IPlaceFiltersDAO;
  page_index: number;
  page_size: number;
  length: number;
}

export interface IPlaceFiltersDAO {
  status: 'ACTIVE' | 'INACTIVE';
  type: string;
  search: string;
}
