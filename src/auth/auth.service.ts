import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthCredentialDTO } from './model/dto/auth-credential.dto';
import { UserCreateDTO } from './model/dto/user-create.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private repository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(dto: UserCreateDTO) {
        return await this.repository.createUser(dto)
    }

    async signIn(dto: AuthCredentialDTO) {
        const { username, password } = dto
        const user = await this.repository.findOneBy({ username })

        if(!user) {
            throw new UnauthorizedException('Username not found')
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new ForbiddenException("Wrong password")
        }

        const payload = { username }
        const accessToken = await this.jwtService.signAsync(payload)

        return {
            accessToken: accessToken
        }
    }
}
