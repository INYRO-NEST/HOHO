import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { User } from "src/decorators/user.decorator";


@Controller('articles')
export class ArticleController {
    constructor (private readonly articleService:ArticleService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createArticle(@Body() body, @User() user) {
        const res = await this.articleService.createArticle(body.title, body.content, user.id);
        return res;
    }
}