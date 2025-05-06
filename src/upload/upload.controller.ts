import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import cloudinary from 'src/common/config/cloudinary.config';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import * as streamifier from 'streamifier';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const result = await new Promise<{ url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio' },
        (error, result) => {
          if (error) return reject(error);
          if (result && result.secure_url) {
            resolve({ url: result.secure_url });
          } else {
            reject(new Error('Upload failed: result is undefined or missing secure_url'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return { imageUrl: result.url };
  }
}
