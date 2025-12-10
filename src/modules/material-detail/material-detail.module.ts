import { Module } from '@nestjs/common';
import { MaterialDetailController } from '@/modules/material-detail/material-detail.controller';
import { MaterialDetailService } from '@/modules/material-detail/material-detail.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  controllers: [MaterialDetailController],
  providers: [MaterialDetailService],
  imports: [PrismaModule],
})
export class MaterialDetailModule {}
