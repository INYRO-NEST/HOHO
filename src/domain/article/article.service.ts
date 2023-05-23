import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "src/entities/article.entity";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService {
    constructor (
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>
    ) {}

    async createArticle(title: string, content: string, userId: string) {
        const article = await this.articleRepository.save({
            content : content,
            title : title,
            userId : userId,
        });
        return article;
    }

    async getArticle(id: string) {
        const article = await this.articleRepository.findOne({
            where: {
                id: id,
            }
        });
        return article;
    }
}