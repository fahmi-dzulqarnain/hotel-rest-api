import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserCreateDTO } from "./model/dto/user-create.dto";
import { User } from "./model/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }

    async createUser(dto: UserCreateDTO) {
        const { username, password, email, noHP } = dto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({
            username,
            password: hashedPassword,
            email,
            noHP
        })

        try {
            await this.save(user)
            
            return {
                message: "Account created successfully"
            }
        } catch (error) {
            if(error.code === "23505")
                throw new ConflictException('Username is already exists')
            else 
                throw new InternalServerErrorException()
        }
    }
}