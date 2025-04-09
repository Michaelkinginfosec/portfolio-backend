import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EMailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SENDINBLUE_SMTP_HOST'),
      port: +(this.configService.get<number>('SENDINBLUE_SMTP_PORT') ?? 587),
      secure: false, 
      auth: {
        user: this.configService.get<string>('SENDINBLUE_SMTP_USER'),
        pass: this.configService.get<string>('SENDINBLUE_SMTP_PASS'),
      },
    });
  }


  

  async sendContactEmail(email: string, name: string, message: string): Promise<void> {
    const mailOptions = {
      from: email, 
      to: this.configService.get<string>('SENDINBLUE_TO_EMAIL'), 
      subject: `Message from ${name}`, 
      text: message, 
    };
  
    
    await this.transporter.sendMail(mailOptions);
  }
}
