// src/contact/contact.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EMailService } from 'src/common/services/email.services';
import { ContactMeDto } from './dto/contact.dto';


@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EMailService) {}

  @Post()
  @ApiOperation({summary: "Contact Michaelking"})
  @ApiResponse({status:201, description: "message sent successfully"})
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async sendContactMessage(
    @Body() data: ContactMeDto 
  ) {
    try {
      await this.emailService.sendContactEmail(data.email, data.name, data.message); 
      return { message: 'Your message has been sent successfully!' };
    } catch (error) {
      console.error(error);
      return { message: 'There was an error sending your message. Please try again.' };
    }
  }
}
