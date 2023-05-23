import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { ApiBody, ApiOperation } from "@nestjs/swagger";


@Controller('auths')
export class AuthController {
    constructor (private readonly authService:AuthService) {}

    
    @ApiOperation({ summary: '로그인 API' })
    @ApiBody({})
    @UseGuards(LocalGuard)
    @Post('login')
    async logIn(@Req() req) {
        const user = req.user;

        return await this.authService.logIn(user);
    }
}