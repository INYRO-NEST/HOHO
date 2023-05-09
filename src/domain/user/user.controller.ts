import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor (private readonly userService:UserService) {}

    @Get('/user-info')
    async getUserPage() {
        const res = await this.userService.getUserPage();
        return res;
    }

    @Post()
    async register(@Body() body) {
        const email = body.email;
        const password = body.password;
        console.log(email);
        console.log(password);
        const user = await this.userService.register(email, password);
        return user
    }
}