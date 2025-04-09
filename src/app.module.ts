import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './common/database/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config/dist';
import { PingModule } from './ping/ping.module';
import { ScheduleModule } from '@nestjs/schedule';



@Module({
  imports: [ProjectModule, PrismaModule, AuthModule, ContactModule,
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    PingModule,ScheduleModule.forRoot()
   ],
  
  providers: [],
})
export class AppModule {}
