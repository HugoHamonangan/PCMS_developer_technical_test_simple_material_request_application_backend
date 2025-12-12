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
import * as materialDetailSchema from '@/modules/material-detail/schema/material-detail-schema';
import { MaterialDetailInterface } from './interfaces/material-detail.interface';

@Injectable()
export class MaterialDetailService {
  constructor(private prisma: PrismaService) {}

  async materialDetail(
    id: number,
  ): Promise<ApiResponseForOne<MaterialDetailInterface>> {
    try {
      const materialDetail =
        await this.prisma.materialDetails.findUniqueOrThrow({
          where: {
            id: id,
          },
        });

      return createResponseForOne(
        materialDetail,
        'Successfully fetch material details',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'Material detail not found', 404);
      }

      return createResponseForOne(error, 'Fail to fetch material detail', 500);
    }
  }

  async materialDetails(
    params: {
      skip?: number;
      take?: number;
      q?: string;
    },
    requestId: number,
  ): Promise<ApiResponseForMany<MaterialDetailInterface>> {
    try {
      const skip = params.skip ? +params.skip : 0;
      const take = params.take ? +params.take : 10;

      const search: Prisma.MaterialDetailsWhereInput = {
        request_id: requestId,
        ...(params.q
          ? {
              OR: [
                {
                  material_code: {
                    contains: params.q,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      };

      const [materialDetails, total] = await this.prisma.$transaction([
        this.prisma.materialDetails.findMany({
          where: search,
          skip,
          take,
        }),
        this.prisma.materialDetails.count({ where: search }),
      ]);

      return createResponseForMany(
        materialDetails,
        'Successfully fetched material details',
        200,
        total,
      );
    } catch (error) {
      return createResponseForMany(
        error,
        'Failed to fetch material details',
        500,
        0,
      );
    }
  }

  async createMaterialDetail(
    data: materialDetailSchema.MaterialDetailType,
  ): Promise<ApiResponseForOne<MaterialDetailInterface>> {
    try {
      const [materialDetail] = await this.prisma.$transaction([
        this.prisma.materialDetails.create({
          data: data as Prisma.MaterialDetailsUncheckedCreateInput,
        }),
      ]);

      return createResponseForOne(
        materialDetail,
        'Sucessfully add material detail',
        201,
      );
    } catch (error) {
      return createResponseForOne(error, 'Fail to add material detais', 500);
    }
  }

  async updateMaterialDetail(
    data: materialDetailSchema.MaterialDetailType,
    id: number,
  ) {
    try {
      const [materialDetail] = await this.prisma.$transaction([
        this.prisma.materialDetails.update({
          where: {
            id: id,
          },

          data: data as Prisma.MaterialDetailsUncheckedCreateInput,
        }),
      ]);
      return createResponseForOne(
        materialDetail,
        'Sucessfully update material detail',
        201,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'MaterialDetail not found', 404);
      }
      return createResponseForOne(error, 'Fail to add material details', 500);
    }
  }

  async deleteMaterialDetail(
    id: number,
  ): Promise<ApiResponseForOne<MaterialDetailInterface>> {
    try {
      const [materialDetail] = await this.prisma.$transaction([
        this.prisma.materialDetails.delete({
          where: {
            id: id,
          },
        }),
      ]);

      return createResponseForOne(
        materialDetail,
        'Successfully delete material detail',
        200,
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return createResponseForOne(null, 'MaterialDetail not found', 404);
      }

      return createResponseForOne(error, 'Fail to delete material detail', 500);
    }
  }
}
