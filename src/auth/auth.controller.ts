import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './model/dto/auth-credential.dto';
import { UserCreateDTO } from './model/dto/user-create.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp')
    signUp(@Body() dto: UserCreateDTO) {
        return this.authService.signUp(dto)
    }

    @Post('signIn')
    signIn(@Body() dto: AuthCredentialDTO) {
       return this.authService.signIn(dto)
    }
}
