import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator";
import { StatusHotel } from "../hotel-status.enum";

export class HotelFilter {
    @IsOptional()
    @IsNumberString()
    bintang?: number

    @IsString()
    @IsOptional()
    searchName?: string

    @IsOptional()
    @IsEnum(StatusHotel)
    status?: string
}