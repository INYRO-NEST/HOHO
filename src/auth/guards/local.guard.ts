import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

export class LocalGuard extends AuthGuard('local') {
    constructor (private readonly authService: AuthService) {
        super();
    }
}