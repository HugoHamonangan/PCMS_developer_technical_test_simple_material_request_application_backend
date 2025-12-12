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
import { MaterialDetailService } from '@/modules/material-detail/material-detail.service';
import { MaterialDetailInterface } from './interfaces/material-detail.interface';
import {
  ApiResponseForMany,
  ApiResponseForOne,
} from '@/helper/response.helper';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';

import {
  materialDetailSchema,
  updateMaterialDetailSchema,
} from '@/modules/material-detail/schema/material-detail-schema';
import type {
  MaterialDetailType,
  UpdateMaterialDetailType,
} from '@/modules/material-detail/schema/material-detail-schema';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';

@Controller('material-details')
export class MaterialDetailController {
  constructor(private materialDetailService: MaterialDetailService) {}

  @Get('request/:id')
  async findAll(
    @Query() query,
    @Param('id', ParseIntPipe) requestId: number,
  ): Promise<ApiResponseForMany<MaterialDetailInterface>> {
    return await this.materialDetailService.materialDetails(query, requestId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<MaterialDetailInterface>> {
    return await this.materialDetailService.materialDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(materialDetailSchema))
    createMaterialDetailBody: MaterialDetailType,
  ) {
    return await this.materialDetailService.createMaterialDetail(
      createMaterialDetailBody,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateMaterialDetailSchema))
    updateMaterialDetailBody: UpdateMaterialDetailType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.materialDetailService.updateMaterialDetail(
      updateMaterialDetailBody,
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.materialDetailService.deleteMaterialDetail(+id);
  }
}
