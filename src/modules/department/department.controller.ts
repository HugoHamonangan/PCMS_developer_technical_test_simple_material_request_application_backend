import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from '@/modules/department/department.service';
import { DepartmentInterface } from '@/modules/department/interfaces/department.interface';
import {
  ApiResponseForMany,
  ApiResponseForOne,
} from '@/helper/response.helper';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';

import {
  departmentSchema,
  updateDepartmentSchema,
} from '@/modules/department/schema/department-schema';
import type {
  DepartmentType,
  UpdateDepartmentType,
} from '@/modules/department/schema/department-schema';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query,
  ): Promise<ApiResponseForMany<DepartmentInterface>> {
    return await this.departmentService.departments(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<DepartmentInterface>> {
    return await this.departmentService.department(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(departmentSchema))
    createDepartmentBody: DepartmentType,
  ) {
    return this.departmentService.createDepartment(createDepartmentBody);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateDepartmentSchema))
    updateDepartmentBody: UpdateDepartmentType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.departmentService.updateDepartment(
      updateDepartmentBody,
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.departmentService.deleteDepartment(+id);
  }
}
