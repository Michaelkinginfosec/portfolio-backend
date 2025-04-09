import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { EMailService } from 'src/common/services/email.services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ContactController],
  providers: [EMailService],
})
export class ContactModule {}
