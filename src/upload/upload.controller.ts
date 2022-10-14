import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload, ImageUploadURL } from './dto/imageBody';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @Body() body: ImageUpload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'svg|png|jpg|jpeg|webp',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const url = await this.uploadService.uploadFile(
      file,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }
  @Post('file-url')
  async uploadFileByUrl(@Body() body: ImageUploadURL) {
    const url = await this.uploadService.uploadFileUrl(
      body.file,
      body.siteId,
      body.parentId,
      body.type,
    );
    return {
      url,
    };
  }

  @Post('delete')
  async deleteImage(@Body() body: { name: string; type: string }) {
    return await this.uploadService.deleteFile(body.name, body.type);
  }

  @Post('deletes')
  async deleteImages(@Body() body: { parentId: string; type: string }) {
    return await this.uploadService.deleteFiles(body.parentId, body.type);
  }
}
