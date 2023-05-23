import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @UseGuards(JwtGuard)
    @Post()
    async createComment(@Body() body, @User() user) {
        const content = body.content;
        const parentId = body?.parentId; // 부모가 없는 경우는 undefined 리턴
        const articleId = body.articleId;
        const userId = user.id;
    
        const comment = await this.commentService.createComment(content, parentId, userId, articleId);
    
        return comment;
    }

    @UseGuards(JwtGuard)
    @Put('/:id')
    async updateComment(@Body() body, @User() user, @Param('id') id) {
        const content = body.content;
        const userId = user.id;
        const commentId = id;
    
        const res = await this.commentService.modifyComment(
            commentId,
            userId,
            content,
        );
    
        return res;
    }
    @UseGuards(JwtGuard)
    @Delete('/:id')
    async deleteComment(@Param('id') id, @User() user) {
        const commentId = id;
        const userId = user.id;
    
        const res = await this.commentService.removeComment(commentId, userId);
    
        return res;
    }

    @UseGuards(JwtGuard)
    @Get()
    async readCommentListByUser (@User() user) {
        const userId = user.id;
    
        const commentList = await this.commentService.getCommentListByUser(
            userId,
        );
    
        return commentList;
    }
}
