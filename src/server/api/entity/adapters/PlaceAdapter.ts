import { PlaceDTO } from '../dto/PlaceDTO';
import { PlaceDAO } from '../dao/PlaceDAO';
import { Place } from '../Place';

export class PlaceAdapter {
  fitToDAO(): PlaceDAO {
    const transformed = new PlaceDAO();
    console.log(this);
    return transformed;
  }

  fitFromDAO(DAOData: PlaceDAO): PlaceDTO {
    const transformed = new PlaceDTO;
    return transformed;
  }
}

