import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller('ping')
export class PingController {
  @Get()
  ping() {
    return 'pong';
  }
}