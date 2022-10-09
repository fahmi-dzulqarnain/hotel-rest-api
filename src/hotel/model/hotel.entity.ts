import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusHotel } from "./hotel-status.enum";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    hotelName: string

    @Column()
    contactNumber: string

    @Column()
    alamat: string

    @Column()
    bintang: number

    @Column()
    statusHotel: StatusHotel

    @Column()
    description: string
}