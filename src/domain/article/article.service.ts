import { Injectable } from "@nestjs/common";
import { ArticleEntity } from "src/entities/article.entity";
import { UserEntity } from "src/entities/user.entity";

@Injectable()
export class ArticleService {
    constructor () {}

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