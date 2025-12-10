/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { UserWithoutPassword } from '@/modules/user/interfaces/user.interface';
import {
  ApiResponseForMany,
  ApiResponseForOne,
} from '@/helper/response.helper';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';

import {
  userSchema,
  updateUserSchema,
} from '@/modules/user/schema/user-schema';
import type {
  UserType,
  UpdateUserType,
} from '@/modules/user/schema/user-schema';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { Roles } from '@/decorator/roles.decorator';
import { RolesGuard } from '@/guard/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(
    @Query() query,
  ): Promise<ApiResponseForMany<UserWithoutPassword>> {
    return await this.userService.users(query);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<UserWithoutPassword>> {
    return await this.userService.user(+id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(userSchema)) createUserBody: UserType,
  ) {
    return this.userService.createUser(createUserBody);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateUserSchema))
    updateUserBody: UpdateUserType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.updateUser(updateUserBody, id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(+id);
  }
}
