import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { DepartmentModule } from '@/modules/department/department.module';
import { PositionModule } from '@/modules/position/position.module';
import { RequestModule } from '@/modules/request/request.module';
import { MaterialDetailModule } from '@/modules/material-detail/material-detail.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    DepartmentModule,
    PositionModule,
    RequestModule,
    MaterialDetailModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
