import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { compare } from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        
        private readonly jwtService: JwtService
    ) {}

    
    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { email: email }
        });

        const hashedPassword = user?.password;
        
        if (!user) {
            throw new BadRequestException('이메일이 잘못되었습니다.' + email);
        }

        const isPasswordMatch = await compare (password, hashedPassword);

        if (!isPasswordMatch) {
            throw new BadRequestException('비밀번호가 잘못되었습니다.');
        }

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    async logIn(user) {
        console.log(user);
        return {
            accessToken: this.jwtService.sign(user)
        };
    }
}