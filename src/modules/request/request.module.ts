import { Module } from '@nestjs/common';
import { RequestController } from '@/modules/request/request.controller';
import { RequestService } from '@/modules/request/request.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [PrismaModule],
})
export class RequestModule {}
