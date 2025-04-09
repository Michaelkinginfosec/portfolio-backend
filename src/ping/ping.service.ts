import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PingService {
  constructor(private readonly httpService: HttpService) {}
  
  @Interval(3 * 60 * 1000) 
  async pingServer() {
    const pingUrl = 'https://portfolio-backend-9kxr.onrender.com/api/v1/ping'; 
    try {
      const response = await lastValueFrom(this.httpService.get(pingUrl));
      console.log('Ping successful:', response.data);
    } catch (error) {
      console.error('Error pinging server:', error.message);
    }
  }
}

