import BookingStatus from "../enum/BookingStatus";
import GPSDeviceDTO from "./GPSDeviceDTO";
import DayOfTripDTO from "./DayOfTripDTO";

interface BookingDTO {
    _id: string
    booking_reference: string
    company_id: number
    account_id: number
    name: string
    description: string
    passanger_name: string
    start_date: Date
    end_date: Date
    comment: string
    days: DayOfTripDTO[]
    gps_device: GPSDeviceDTO
    created_by: string
    status: BookingStatus
}

export default BookingDTO