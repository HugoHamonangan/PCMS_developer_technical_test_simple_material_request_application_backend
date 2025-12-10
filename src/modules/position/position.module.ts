import { Module } from '@nestjs/common';
import { PositionController } from '@/modules/position/position.controller';
import { PositionService } from '@/modules/position/position.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [PrismaModule],
})
export class PositionModule {}
