import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async getUserPage() {
        return this.userRepository.find();
    }

    async register(email: string, password: string) {
        const user = await this.userRepository.save({
            email: email,
            password: await hash(password, 10),
        });
        return user;
    }
}