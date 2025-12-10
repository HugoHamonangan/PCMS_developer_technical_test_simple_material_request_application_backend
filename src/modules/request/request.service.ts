/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Request, Prisma } from '@/generated/prisma';

import {
  ApiResponseForMany,
  ApiResponseForOne,
  createResponseForMany,
  createResponseForOne,
} from '@/helper/response.helper';
import * as requestSchema from '@/modules/request/schema/request-schema';
import { RequestInterface } from '@/modules/request/interfaces/request.interface';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async request(id: number): Promise<ApiResponseForOne<RequestInterface>> {
    try {
      const request = await this.prisma.request.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return createResponseForOne(request, 'Successfully fetch requests', 200);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Request not found', 404);
      }

      return createResponseForOne(error, 'Fail to fetch requests', 500);
    }
  }

  async requests(params: {
    skip?: number;
    take?: number;
    q?: string;
  }): Promise<ApiResponseForMany<RequestInterface>> {
    try {
      const skip = +params.skip ? +params.skip : 0;
      const take = +params.take ? +params.take : 10;

      const search: Prisma.RequestWhereInput = params.q
        ? {
            OR: [
              {
                project_name: {
                  contains: params.q,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {};

      const [requests, total] = await this.prisma.$transaction([
        this.prisma.request.findMany({
          where: search,
          skip,
          take,
        }),
        this.prisma.request.count({ where: search, skip, take }),
      ]);

      return createResponseForMany(
        requests,
        'Successfully fetch requests',
        200,
        total,
      );
    } catch (error) {
      return createResponseForMany(error, 'Fail to fetch requests', 500, 0);
    }
  }

  async createRequest(
    data: requestSchema.RequestType,
  ): Promise<ApiResponseForOne<RequestInterface>> {
    try {
      const code = `MR-${new Date().getFullYear()}-${Date.now()}`;

      data.request_code = code;

      const [request] = await this.prisma.$transaction([
        this.prisma.request.create({
          data: data as Prisma.RequestUncheckedCreateInput,
        }),
      ]);

      return createResponseForOne(request, 'Sucessfully add request', 201);
    } catch (error) {
      return createResponseForOne(error, 'Fail to add requests', 500);
    }
  }

  async updateRequest(data: requestSchema.RequestType, id: number) {
    try {
      const [request] = await this.prisma.$transaction([
        this.prisma.request.update({
          where: {
            id: id,
          },

          data: data as Prisma.RequestUncheckedCreateInput,
        }),
      ]);
      return createResponseForOne(request, 'Sucessfully update request', 201);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Request not found', 404);
      }
      return createResponseForOne(error, 'Fail to add requests', 500);
    }
  }

  async deleteRequest(
    id: number,
  ): Promise<ApiResponseForOne<RequestInterface>> {
    try {
      const [request] = await this.prisma.$transaction([
        this.prisma.request.delete({
          where: {
            id: id,
          },
        }),
      ]);

      return createResponseForOne(request, 'Successfully delete request', 200);
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Request not found', 404);
      }

      return createResponseForOne(error, 'Fail to delete request', 500);
    }
  }
}
