import { EntityRepository, Repository } from "typeorm";
import { Account } from './user.entity';
import { AccountDto } from './dto/signup-user.dto'
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

    async signUp(accountDto: AccountDto): Promise<any> {
        const { username, password, email } = accountDto;

        const user = new Account();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.createdAt = new Date().toLocaleDateString();

        try {
            await user.save();

            return {
                success: true,
                message: 'User registered successful. ',
                date: user.createdAt
            }
        } catch(error) {
            if (error.code === '23505') { 
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException('Something wrong!!');
            } 
        }
    }

    async validationUserPassword(accountDto: AccountDto): Promise<any> {
        const { email, password } = accountDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}