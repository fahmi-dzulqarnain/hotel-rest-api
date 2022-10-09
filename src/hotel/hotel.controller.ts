import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelCreateDTO } from './model/dto/hotel-create.dto';
import { HotelFilter } from './model/dto/hotel-filter.dto';

@Controller('hotel')
export class HotelController {
    constructor(private service: HotelService) {}

    @Post()
    createNew(@Body() dto: HotelCreateDTO) {
        return this.service.createNew(dto)
    }

    @Get()
    getData(@Query() filterDTO: HotelFilter) {
        if(Object.keys(filterDTO).length) {
            return this.service.getWithFilter(filterDTO)
        }

        return this.service.getAll()
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.service.getByID(id)
    }

    @Put(':id')
    updateByID(
        @Param('id') id: string, 
        @Body() dto: HotelCreateDTO
    ) {
        return this.service.updateByID(id, dto)
    }

    @Delete(':id')
    deleteByID(@Param('id') id: string) {
        return this.service.deleteByID(id)
    }
}
