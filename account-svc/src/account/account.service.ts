import { HttpService, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { AccountDto } from './dto/signup-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(AccountRepository)
        private accountRepository: AccountRepository,
        private jwtService: JwtService,
        private redisService: RedisService,
    ) {}

    async signUp(accountDto: AccountDto): Promise<string> {
        return this.accountRepository.signUp(accountDto);
    }

    async signIn(accountDto: AccountDto) {
        const { email } = accountDto;
        const result = await this.accountRepository.validationUserPassword(accountDto);

        if (!result) {
            throw new UnauthorizedException('Invalid account or password')
        };

        const token = this.jwtService.sign({ user: result });
        await this.redisService.setToken(email, token);

        return {
            success: true,
            message: 'login successful',
            token: token,
            username: result.username,
            email: result.email,
        };
    }

    async auth(cookies: { auth_token?: string }): Promise<any> {
        if (!cookies.auth_token) {
            throw new InternalServerErrorException('cookie not exist')
        }
        
        const [key, value] = cookies.auth_token.split("/");
        const token = await this.redisService.validateToken(key);

        if (!token || value !== token) {
            throw new InternalServerErrorException('token not matched')
        }
        
        const verify_token = this.jwtService.verify(token);

        return {
            username: verify_token.user.username,
            email: verify_token.user.email
        };
    }

}
