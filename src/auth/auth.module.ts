import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/common/database/prisma/prisma.module';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '9218497324091239041923qwiropqwieroqweruopqweruoqwerp2310', 
      signOptions: { expiresIn: '15m' },
    }),
    PrismaModule,
  ],
  providers: [AuthService,JwtStrategy ],
  controllers: [AuthController],
})
export class AuthModule {}