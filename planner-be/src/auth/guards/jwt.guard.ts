import { AuthGuard } from '@nestjs/passport';

export class JwtAythGuard extends AuthGuard('jwt') {}
