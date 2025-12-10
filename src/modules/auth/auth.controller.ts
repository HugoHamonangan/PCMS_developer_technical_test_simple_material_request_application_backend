/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';
import { z } from 'zod';

export const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthType = z.infer<typeof authSchema>;

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body(new ZodValidationPipe(authSchema)) login: AuthType) {
    return await this.authService.login(login);
  }
}
