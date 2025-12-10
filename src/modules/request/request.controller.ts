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
  requestSchema,
  updateRequestSchema,
} from '@/modules/request/schema/request-schema';
import type {
  RequestType,
  UpdateRequestType,
} from '@/modules/request/schema/request-schema';

@Controller('requests')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Get()
  async findAll(@Query() query): Promise<ApiResponseForMany<RequestInterface>> {
    return await this.requestService.requests(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponseForOne<RequestInterface>> {
    return await this.requestService.request(+id);
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(requestSchema))
    createRequestBody: RequestType,
  ) {
    return this.requestService.createRequest(createRequestBody);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateRequestSchema))
    updateRequestBody: UpdateRequestType,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.requestService.updateRequest(updateRequestBody, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.requestService.deleteRequest(+id);
  }
}
