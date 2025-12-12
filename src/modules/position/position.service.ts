/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Prisma } from '@prisma/client';
import {
  ApiResponseForMany,
  ApiResponseForOne,
  createResponseForMany,
  createResponseForOne,
} from '@/helper/response.helper';
import * as positionSchema from '@/modules/position/schema/position-schema';
import { PositionInterface } from '@/modules/position/interfaces/position.interface';

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async position(id: number): Promise<ApiResponseForOne<PositionInterface>> {
    try {
      const position = await this.prisma.position.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return createResponseForOne(
        position,
        'Successfully fetch positions',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Position not found', 404);
      }

      return createResponseForOne(error, 'Fail to fetch positions', 500);
    }
  }

  async positions(params: {
    skip?: number;
    take?: number;
    q?: string;
  }): Promise<ApiResponseForMany<PositionInterface>> {
    try {
      const skip = +params.skip ? +params.skip : 0;
      const take = +params.take ? +params.take : 10;

      const search: Prisma.PositionWhereInput = params.q
        ? {
            OR: [
              {
                name: {
                  contains: params.q,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {};

      const [positions, total] = await this.prisma.$transaction([
        this.prisma.position.findMany({
          where: search,
          skip,
          take,
        }),
        this.prisma.position.count({ where: search, skip, take }),
      ]);

      return createResponseForMany(
        positions,
        'Successfully fetch positions',
        200,
        total,
      );
    } catch (error) {
      return createResponseForMany(error, 'Fail to fetch positions', 500, 0);
    }
  }

  async createPosition(
    data: positionSchema.PositionType,
  ): Promise<ApiResponseForOne<PositionInterface>> {
    try {
      const [position] = await this.prisma.$transaction([
        this.prisma.position.create({
          data: data as Prisma.PositionUncheckedCreateInput,
        }),
      ]);

      return createResponseForOne(position, 'Sucessfully add position', 201);
    } catch (error) {
      return createResponseForOne(error, 'Fail to add positions', 500);
    }
  }

  async updatePosition(data: positionSchema.PositionType, id: number) {
    try {
      const [position] = await this.prisma.$transaction([
        this.prisma.position.update({
          where: {
            id: id,
          },

          data: data as Prisma.PositionUncheckedCreateInput,
        }),
      ]);
      return createResponseForOne(position, 'Sucessfully update position', 201);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Position not found', 404);
      }
      return createResponseForOne(error, 'Fail to add positions', 500);
    }
  }

  async deletePosition(
    id: number,
  ): Promise<ApiResponseForOne<PositionInterface>> {
    try {
      const [position] = await this.prisma.$transaction([
        this.prisma.position.delete({
          where: {
            id: id,
          },
        }),
      ]);

      return createResponseForOne(
        position,
        'Successfully delete position',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Position not found', 404);
      }

      return createResponseForOne(error, 'Fail to delete position', 500);
    }
  }
}
