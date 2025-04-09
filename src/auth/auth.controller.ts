import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 //to be deleted
  // @Post('signup')
  // signup(@Body() dto: SignupDto) {
  //   return this.authService.signup(dto);
  // }

  @Post('login')
  @ApiOperation({summary: "Login"})
  @ApiResponse({ status: 201, description: 'Login Success', type: LoginDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  
  @ApiBearerAuth('access-token')
  @Post('refresh')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({summary: "Refresh token"})
  @ApiResponse({ status: 201, type: RefreshTokenDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }
}
