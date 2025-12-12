/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RequestService } from '@/modules/request/request.service';
import { RequestInterface } from '@/modules/request/interfaces/request.interface';
import {
  ApiResponseForMany,
  ApiResponseForOne,
} from '@/helper/response.helper';

import { ZodValidationPipe } from '@/validators/pipes/zod-validator.pipe';

import {
  AddRequestSchema,
  requestSchema,
  updateRequestSchema,
} from '@/modules/request/schema/request-schema';
import type {
  RequestType,
  UpdateRequestType,
} from '@/modules/request/schema/request-schema';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';
import { Roles } from '@/decorator/roles.decorator';
import { RolesGuard } from '@/guard/roles.guard';

@Controller('requests')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query,
    @Req() req,
  ): Promise<ApiResponseForMany<RequestInterface>> {
    return await this.requestService.requests(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<RequestInterface>> {
    return await this.requestService.request(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(AddRequestSchema))
    createRequestBody: RequestType,

    @Req() req,
  ) {
    return this.requestService.createRequest(createRequestBody, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateRequestSchema))
    updateRequestBody: UpdateRequestType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.requestService.updateRequest(updateRequestBody, id);
  }

  @Roles('ADMIN', 'APPROVER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/approve')
  async updateApprove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return await this.requestService.updateRequestApproval(req.user, id);
  }

  @Roles('ADMIN', 'APPROVER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/reject')
  async updateRejection(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return await this.requestService.updateRequestRejection(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.requestService.deleteRequest(+id);
  }
}
