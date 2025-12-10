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
import { PositionService } from '@/modules/position/position.service';
import { PositionInterface } from '@/modules/position/interfaces/position.interface';
import {
  ApiResponseForMany,
  ApiResponseForOne,
} from '@/helper/response.helper';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';

import {
  positionSchema,
  updatePositionSchema,
} from '@/modules/position/schema/position-schema';
import type {
  PositionType,
  UpdatePositionType,
} from '@/modules/position/schema/position-schema';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Controller('positions')
export class PositionController {
  constructor(private positionService: PositionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query,
  ): Promise<ApiResponseForMany<PositionInterface>> {
    return await this.positionService.positions(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<PositionInterface>> {
    return await this.positionService.position(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(positionSchema))
    createPositionBody: PositionType,
  ) {
    return await this.positionService.createPosition(createPositionBody);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updatePositionSchema))
    updatePositionBody: UpdatePositionType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.positionService.updatePosition(updatePositionBody, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.positionService.deletePosition(+id);
  }
}
