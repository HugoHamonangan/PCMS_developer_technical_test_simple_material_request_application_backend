/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Prisma, User } from '@prisma/client';

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
        include: {
          request_by: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          approved_by: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          rejected_by: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          department: true,
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

  async requests(
    params: {
      skip?: number;
      take?: number;
      q?: string;
    },
    req,
  ): Promise<ApiResponseForMany<RequestInterface>> {
    try {
      const skip = +params.skip ? +params.skip : 0;
      const take = +params.take ? +params.take : 10;

      const isPermittedUser = !['ADMIN', 'APPROVER'].includes(req.role);
      const search: Prisma.RequestWhereInput = {
        ...(isPermittedUser ? { requested_by_id: req.id } : {}),
        ...(params.q
          ? { project_name: { contains: params.q, mode: 'insensitive' } }
          : {}),
      };

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
    req: User,
  ): Promise<ApiResponseForOne<RequestInterface>> {
    try {
      const code = `MR-${new Date().getFullYear()}-${Date.now()}`;

      data.requested_by_id = req.id;
      data.request_code = code;
      data.request_date = new Date().toISOString();
      data.department_id = req.department_id;

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

  async updateRequest(data: requestSchema.UpdateRequestType, id: number) {
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

  async updateRequestApproval(req: User, id: number) {
    try {
      const approvedId = req.id;
      const [request] = await this.prisma.$transaction([
        this.prisma.request.update({
          where: {
            id: id,
          },
          data: {
            approved_by_id: approvedId,
            approved_at: new Date().toISOString(),
            rejected_by_id: null,
            rejected_at: null,
            status: 'APPROVED',
          },
        }),
      ]);
      return createResponseForOne(
        request,
        'Sucessfully approve this request',
        201,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Request not found', 404);
      }
      return createResponseForOne(error, 'Fail to approve ', 500);
    }
  }

  async updateRequestRejection(req: User, id: number) {
    try {
      const rejectedId = req.id;
      const [request] = await this.prisma.$transaction([
        this.prisma.request.update({
          where: {
            id: id,
          },
          data: {
            approved_by_id: null,
            approved_at: null,
            rejected_by_id: rejectedId,
            rejected_at: new Date().toISOString(),
            status: 'REJECTED',
          },
        }),
      ]);
      return createResponseForOne(
        request,
        'Sucessfully reject this request',
        201,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Request not found', 404);
      }
      return createResponseForOne(error, 'Fail to reject request', 500);
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
