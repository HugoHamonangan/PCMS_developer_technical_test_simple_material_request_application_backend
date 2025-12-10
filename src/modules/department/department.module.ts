import { Module } from '@nestjs/common';
import { DepartmentController } from '@/modules/department/department.controller';
import { DepartmentService } from '@/modules/department/department.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [PrismaModule],
})
export class DepartmentModule {}
