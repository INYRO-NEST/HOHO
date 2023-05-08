import { Controller, Get } from "@nestjs/common";
import { ArticleService } from "./article.service";


@Controller('article')
export class ArticleController {
    constructor (private readonly articleService:ArticleService) {}

    @Get()
    async getArticlePage() {
        const res = await this.articleService.getArticlePage();
        return res;
    }
}