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

    makeUser(): UserEntity {
        const user = new UserEntity();

        user.email = "123@123.com";
        user.password = "1234";
        user.id = "1";
        return user;
    }

    makeArticle(): ArticleEntity {
        const article = new ArticleEntity();
        article.content = "content";
        article.title = "hehe";
        article.user = this.makeUser();
        article.userId = article.user.id;

        return article;
    }

    async getArticlePage() {
        const article = this.makeArticle();

        return {
            title : article.title,
            content : article.content,
            userId : article.userId,
        };
    }
}