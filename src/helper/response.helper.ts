import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {
  UnauthorizedException,
  ForbiddenException,
  MethodNotAllowedException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  PreconditionFailedException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  ImATeapotException,
  MisdirectedException,
  UnprocessableEntityException,
  NotImplementedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  HttpVersionNotSupportedException,
} from '@nestjs/common';

export type ApiResponseForMany<T> = {
  items: T[];
  count: number;
  status: string;
  code: number;
};

export type ApiResponseForOne<T> = {
  item: T;
  status: string;
  code: number;
};

export const createResponseForMany = <T>(
  items: T[],
  status: string = 'success',
  code: number = 200,
  count: number = 0,
): ApiResponseForMany<T> => {
  handleServiceResponse(code);

  return {
    items,
    count: count,
    status,
    code,
  };
};

export const createResponseForOne = <T>(
  item: T,
  status: string = 'success',
  code: number = 200,
): ApiResponseForOne<T> => {
  handleServiceResponse(code);
  return {
    item,
    status,
    code,
  };
};

export const handleServiceResponse = (code: number) => {
  if (code === 400) throw new BadRequestException();
  if (code === 401) throw new UnauthorizedException();
  if (code === 403) throw new ForbiddenException();
  if (code === 404) throw new NotFoundException();
  if (code === 405) throw new MethodNotAllowedException();
  if (code === 406) throw new NotAcceptableException();
  if (code === 408) throw new RequestTimeoutException();
  if (code === 409) throw new ConflictException();
  if (code === 410) throw new GoneException();
  if (code === 412) throw new PreconditionFailedException();
  if (code === 413) throw new PayloadTooLargeException();
  if (code === 415) throw new UnsupportedMediaTypeException();
  if (code === 418) throw new ImATeapotException();
  if (code === 421) throw new MisdirectedException();
  if (code === 422) throw new UnprocessableEntityException();

  if (code === 500) throw new InternalServerErrorException();
  if (code === 501) throw new NotImplementedException();
  if (code === 502) throw new BadGatewayException();
  if (code === 503) throw new ServiceUnavailableException();
  if (code === 504) throw new GatewayTimeoutException();
  if (code === 505) throw new HttpVersionNotSupportedException();

  return;
};
