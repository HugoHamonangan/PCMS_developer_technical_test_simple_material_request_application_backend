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
import * as departmentSchema from '@/modules/department/schema/department-schema';
import { DepartmentInterface } from '@/modules/department/interfaces/department.interface';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async department(
    id: number,
  ): Promise<ApiResponseForOne<DepartmentInterface>> {
    try {
      const department = await this.prisma.department.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return createResponseForOne(
        department,
        'Successfully fetch departments',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Department not found', 404);
      }

      return createResponseForOne(error, 'Fail to fetch departments', 500);
    }
  }

  async departments(params: {
    skip?: number;
    take?: number;
    q?: string;
  }): Promise<ApiResponseForMany<DepartmentInterface>> {
    try {
      const skip = +params.skip ? +params.skip : 0;
      const take = +params.take ? +params.take : 10;

      const search: Prisma.DepartmentWhereInput = params.q
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

      const [departments, total] = await this.prisma.$transaction([
        this.prisma.department.findMany({
          where: search,
          skip,
          take,
        }),
        this.prisma.department.count({ where: search, skip, take }),
      ]);

      return createResponseForMany(
        departments,
        'Successfully fetch departments',
        200,
        total,
      );
    } catch (error) {
      return createResponseForMany(error, 'Fail to fetch departments', 500, 0);
    }
  }

  async createDepartment(
    data: departmentSchema.DepartmentType,
  ): Promise<ApiResponseForOne<DepartmentInterface>> {
    try {
      const [department] = await this.prisma.$transaction([
        this.prisma.department.create({
          data: data as Prisma.DepartmentUncheckedCreateInput,
        }),
      ]);

      return createResponseForOne(
        department,
        'Sucessfully add department',
        201,
      );
    } catch (error) {
      return createResponseForOne(error, 'Fail to add departments', 500);
    }
  }

  async updateDepartment(data: departmentSchema.DepartmentType, id: number) {
    try {
      const [department] = await this.prisma.$transaction([
        this.prisma.department.update({
          where: {
            id: id,
          },

          data: data as Prisma.DepartmentUncheckedCreateInput,
        }),
      ]);
      return createResponseForOne(
        department,
        'Sucessfully update department',
        201,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Department not found', 404);
      }
      return createResponseForOne(error, 'Fail to add departments', 500);
    }
  }

  async deleteDepartment(
    id: number,
  ): Promise<ApiResponseForOne<DepartmentInterface>> {
    try {
      const [department] = await this.prisma.$transaction([
        this.prisma.department.delete({
          where: {
            id: id,
          },
        }),
      ]);

      return createResponseForOne(
        department,
        'Successfully delete department',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Department not found', 404);
      }

      return createResponseForOne(error, 'Fail to delete department', 500);
    }
  }
}
