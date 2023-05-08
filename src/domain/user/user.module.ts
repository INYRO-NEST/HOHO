import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], // for root에서 userentity에 해당하는 table을 쓰겠다.
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {}
