import { Controller, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AccountService } from './account.service';
import { AccountDto } from './dto/signup-user.dto';

@Controller()
export class AccountController {

    constructor(private accountService: AccountService) {}

    @MessagePattern('signup')
    async signUp(@Payload() accountDto: AccountDto) {
        return await this.accountService.signUp(accountDto);
    }

    @MessagePattern('signin')
    async signIn(@Payload() accountDto: AccountDto, @Res() res: Response) {
        return await this.accountService.signIn(accountDto);
    }

    @MessagePattern('auth')
    async auth(@Payload() accountDto) {
        return await this.accountService.auth(accountDto);
    }
}
