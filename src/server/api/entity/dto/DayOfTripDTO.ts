import EventDTO from "./EventDTO";

interface DayOfTripDTO {
    _id: string
    order: number
    events: EventDTO[]
}

export default DayOfTripDTO