import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // async signup(dto: SignupDto) {
  //   const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
  //   if (existing) throw new BadRequestException('User already exists');

  //   const hashedPassword = await bcrypt.hash(dto.password, 10);

  //   const user = await this.prisma.user.create({
  //     data: {
  //       email: dto.email,
  //       password: hashedPassword,
  //     },
  //   });

  //   return { message: 'User created successfully', user };
  // }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
  
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  
    const tokens = await this.getTokens(user.id, user.email);
  
  
    const hashedRt = await bcrypt.hash(tokens.refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRt },
    });
  
    return {
      ...tokens,
      user: { id: user.id, email: user.email }
    };
  }
  
  async getTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '15m' }
    );
  
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      { expiresIn: '7d' }
    );
  
    return { accessToken, refreshToken };
  }


  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || !user.refreshToken) throw new ForbiddenException('Access denied');
  
      const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!refreshTokenMatches) throw new ForbiddenException('Invalid refresh token');
  
      const tokens = await this.getTokens(user.id, user.email);
  
     
      const hashedRt = await bcrypt.hash(tokens.refreshToken, 10);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRt },
      });
  
      return tokens;
    } catch (error) {
      throw new ForbiddenException('Token expired or invalid');
    }
  }
}
