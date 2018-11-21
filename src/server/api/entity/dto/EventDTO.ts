import EventType from "../enum/EventType";
import ProductDTO from "./ProductDTO";

interface EventDTO {
    _id: string
    dayId: string
    name: string
    description: string
    eventType: EventType
    time: Date
    order: number
    product?: ProductDTO
    company_id: number
    color: string
    created_by: string
    created_at: Date
    updated_at: Date
}

export default EventDTO