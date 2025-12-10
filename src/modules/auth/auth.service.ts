/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { PrismaService } from '@/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthType } from './auth.controller';
import { createResponseForOne } from '@/helper/response.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(login: AuthType) {
    try {
      const { email, password } = login;

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (user.status !== 'ACTIVE') {
        throw new UnauthorizedException('Account is inactive');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = await this.jwtService.signAsync(payload);

      const { password: _, ...result } = user;

      return createResponseForOne(
        { ...result, access_token },
        'User login successfully',
        200,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
