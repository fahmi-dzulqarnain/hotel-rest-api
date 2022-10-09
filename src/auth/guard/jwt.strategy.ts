import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../auth.repository";
import { User } from "../model/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'rahasiaLah',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: { username: string }) {
        const { username } = payload

        const user: User = await this.userRepository.findOneBy({ username })

        if(!user) {
            throw new UnauthorizedException('Token invalid')
        }

        return user
    }
}