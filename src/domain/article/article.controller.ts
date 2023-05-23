import { Body, Controller, Post, UseGuards, Get, Param } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { User } from "src/decorators/user.decorator";
import { CreateArticleDto } from "src/dtos/create-article.dto";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";


@Controller('articles')
export class ArticleController {
    constructor (private readonly articleService:ArticleService) {}

    @ApiOperation({ summary: '게시글 작성 API' })
    @ApiBody({
        type: CreateArticleDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post()
    async createArticle(@Body() body: CreateArticleDto, @User() user) {
        const res = await this.articleService.createArticle(body.title, body.content, user.id);
        return res;
    }
    
    @Get("/:id")
    async getArticle(@Param("id") id: string) {
        const res = await this.articleService.getArticle(id);
        return res;
    }
}