/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Prisma } from '@prisma/client';
import { UserWithoutPassword } from '@/modules/user/interfaces/user.interface';

import {
  ApiResponseForMany,
  ApiResponseForOne,
  createResponseForMany,
  createResponseForOne,
} from '@/helper/response.helper';
import * as userSchema from '@/modules/user/schema/user-schema';
import { createHashing } from '@/helper/hashing.helper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(id: number): Promise<ApiResponseForOne<UserWithoutPassword>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        omit: {
          password: true,
        },
        include: {
          department: true,
          position: true,
        },
      });

      return createResponseForOne(user, 'Successfully fetch users', 200);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'User not found', 404);
      }

      return createResponseForOne(error, 'Fail to fetch users', 500);
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    q?: string;
  }): Promise<ApiResponseForMany<UserWithoutPassword>> {
    try {
      const skip = +params.skip ? +params.skip : 0;
      const take = +params.take ? +params.take : 10;

      const search: Prisma.UserWhereInput = params.q
        ? {
            OR: [
              {
                name: {
                  contains: params.q,
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: params.q,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {};

      const [users, total] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where: search,
          skip,
          take,
          omit: { password: true },
          include: {
            department: true,
            position: true,
          },
        }),
        this.prisma.user.count({ where: search, skip, take }),
      ]);

      return createResponseForMany(
        users,
        'Successfully fetch users',
        200,
        total,
      );
    } catch (error) {
      return createResponseForMany(error, 'Fail to fetch users', 500, 0);
    }
  }

  async createUser(
    data: userSchema.UserType,
  ): Promise<ApiResponseForOne<UserWithoutPassword>> {
    try {
      data.password = await createHashing(data.password);

      const [user] = await this.prisma.$transaction([
        this.prisma.user.create({
          data: data as Prisma.UserUncheckedCreateInput,
          omit: { password: true },
          include: {
            department: true,
            position: true,
          },
        }),
      ]);

      return createResponseForOne(user, 'Sucessfully add user', 201);
    } catch (error) {
      return createResponseForOne(error, 'Fail to add users', 500);
    }
  }

  async updateUser(data: userSchema.UpdateUserType, id: number) {
    try {
      const [user] = await this.prisma.$transaction([
        this.prisma.user.update({
          where: {
            id: id,
          },
          omit: { password: true },
          include: {
            department: true,
            position: true,
          },
          data: data as Prisma.UserUncheckedCreateInput,
        }),
      ]);
      return createResponseForOne(user, 'Sucessfully update user', 201);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'User not found', 404);
      }
      return createResponseForOne(error, 'Fail to add users', 500);
    }
  }

  async deleteUser(
    id: number,
  ): Promise<ApiResponseForOne<UserWithoutPassword>> {
    try {
      const [user] = await this.prisma.$transaction([
        this.prisma.user.delete({
          where: {
            id: id,
          },
          omit: { password: true },
        }),
      ]);

      return createResponseForOne(user, 'Successfully delete user', 200);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'User not found', 404);
      }

      return createResponseForOne(error, 'Fail to delete user', 500);
    }
  }
}
