import ImageDTO from "./ImageDTO";
import LegDTO from "./LegDTO";
import ThingToKnowDTO from "./ThingToKnowDTO";
import PlaceDTO from "./PlaceDTO";
import ProductDTO from "./ProductDTO";

interface RouteDTO extends ProductDTO {
    search_name: string
    route_type: string
    road_surface: string
    description: string
    images: ImageDTO[]
    origin: PlaceDTO
    destination: PlaceDTO
    middle_points: PlaceDTO[]
    things_to_know: ThingToKnowDTO[]
    legs: LegDTO[]
    company_id: number
    created_by: string
}

export default RouteDTO