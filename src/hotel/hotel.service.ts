import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelCreateDTO } from './model/dto/hotel-create.dto';
import { HotelFilter } from './model/dto/hotel-filter.dto';
import { Hotel } from './model/hotel.entity';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private repository: Repository<Hotel>
    ) {}

    async createNew(dto: HotelCreateDTO) {
        const newHotel = this.repository.create({
            ...dto
        })

        await this.repository.save(newHotel)
        return newHotel
    }

    async getAll() {
        return await this.repository.find()
    }

    async getWithFilter(dto: HotelFilter) {
        const { bintang, searchName, status } = dto
        var filtered = await this.getAll()

        if(bintang) {
            filtered = filtered.filter(hotel => 
                hotel.bintang == bintang
            )
        }

        if (searchName) {
            const searchQuery = searchName.toLowerCase()
            filtered = filtered.filter(hotel => 
                hotel.hotelName.toLowerCase().includes(searchQuery)
            )
        }

        if(status) {
            filtered = filtered.filter(hotel => 
                hotel.statusHotel === status
            )
        }

        return filtered
    }

    async getByID(id: string) {
        const isExists = await this.repository.findOne({
            where: { id }
        })

        if(!isExists)
            throw new NotFoundException(`There is no hotel with id ${id}`)

        return isExists
    }

    async updateByID(id: string, dto: Partial<HotelCreateDTO>) {
        const isExists = await this.repository.findOne({
            where: { id }
        })

        if(!isExists)
            throw new NotFoundException(`There is no hotel with id ${id}. Update ignored.`)

        this.repository.update({id}, dto)

        return dto
    }

    async deleteByID(id: string) {
        const isExists = await this.repository.findOne({
            where: { id }
        })

        if(!isExists)
            throw new NotFoundException(`There is no hotel with id ${id}. Delete ignored.`)

        await this.repository.delete({ id })
        return isExists
    }
}
