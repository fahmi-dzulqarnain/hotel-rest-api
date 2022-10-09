import { IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Max, Min } from "class-validator"
import { StatusHotel } from "../hotel-status.enum"

export class HotelCreateDTO {
    @IsString()
    @IsNotEmpty()
    hotelName: string

    @IsPhoneNumber()
    contactNumber: string

    @IsString()
    @IsNotEmpty()
    alamat: string

    @IsNumber()
    @Min(1)
    @Max(5)
    bintang: number

    @IsEnum(StatusHotel)
    statusHotel: StatusHotel

    @IsString()
    @IsNotEmpty()
    description: string
}