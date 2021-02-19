import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { AccountDto } from './account.dto';

@Controller('account')
export class AccountController {
    constructor(
        @Inject('ACCOUNT_SERVICE') private accountClient: ClientProxy,
        @Inject('FRIEND_SERVICE') private friendClient: ClientProxy,
    ) {}

    @Post('signup')
    async signUp(account: AccountDto) {
        await this.friendClient.send('signup', account).toPromise();
        return await this.accountClient.send('signup', account).toPromise();
    }
    
    @Post('signin')
    async signIn(@Body() account: AccountDto, @Res() res: Response) {
        const result =  await this.accountClient.send('signin', account).toPromise();

        res.cookie('auth_token', `${account.email}/${result.token}`);
        res.send(result);
    }

    @Get('auth')
    async auth(@Req() req: Request) {
        return await this.accountClient.send('auth', req.cookies).toPromise();
    }
}
