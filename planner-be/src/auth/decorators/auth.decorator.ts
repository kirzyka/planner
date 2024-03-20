import { UseGuards } from '@nestjs/common';
import { JwtAythGuard } from '../guards/jwt.guard';

export const Auth = () => UseGuards(JwtAythGuard);
