import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageUpload, ImageUploadDto } from './dto/imageBody';
import { deleteFile, uploadFile } from 'src/utils/cloudinary';
import {
  deleteFileSites,
  deleteFilesSites,
  uploadFileSites,
} from 'src/utils/cloudinarySites';
import {
  deleteFilePages,
  deleteFilesPages,
  uploadFilePages,
} from 'src/utils/cloudinaryPages';
import {
  deleteFilesWear,
  deleteFileWear,
  uploadFileWear,
} from 'src/utils/cloudinaryWear';
import {
  deleteFileFood,
  deleteFilesFood,
  uploadFileFood,
} from 'src/utils/cloudinaryFood';
import {
  deleteFilesTool,
  deleteFileTool,
  uploadFileTool,
} from 'src/utils/cloudinaryTool';
import {
  deleteFileGlasses,
  deleteFilesGlasses,
  uploadFileGlasses,
} from 'src/utils/cloudinaryGlasses';
import {
  deleteFileFurniture,
  deleteFilesFurniture,
  uploadFileFurniture,
} from 'src/utils/cloudinaryFurniture';
import {
  deleteFileEngine,
  deleteFilesEngine,
  uploadFileEngine,
} from 'src/utils/cloudinaryEngine';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @Body() body: ImageUploadDto,
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
    const url = await uploadFile(file, body.site);
    return {
      url,
    };
  }

  @Post('delete')
  async deleteImage(@Body() body: { name: string }) {
    return await deleteFile(body.name);
  }

  @Post('file-sites')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationSites(
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
    const url = await uploadFileSites(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-sites')
  async deleteImageSites(@Body() body: { name: string }) {
    return await deleteFileSites(body.name);
  }
  @Post('deletes-sites')
  async deleteImagesSites(@Body() body: { parentId: string }) {
    return await deleteFilesSites(body.parentId);
  }
  @Post('file-pages')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationPages(
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
    const url = await uploadFilePages(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-pages')
  async deleteImagePages(@Body() body: { name: string }) {
    return await deleteFilePages(body.name);
  }
  @Post('deletes-pages')
  async deleteImagesPages(@Body() body: { parentId: string }) {
    return await deleteFilesPages(body.parentId);
  }
  @Post('file-wear')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationWear(
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
    const url = await uploadFileWear(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-wear')
  async deleteImageWear(@Body() body: { name: string }) {
    return await deleteFileWear(body.name);
  }
  @Post('deletes-wear')
  async deleteImagesWear(@Body() body: { parentId: string }) {
    return await deleteFilesWear(body.parentId);
  }
  @Post('file-food')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationFood(
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
    const url = await uploadFileFood(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-food')
  async deleteImageFood(@Body() body: { name: string }) {
    return await deleteFileFood(body.name);
  }
  @Post('deletes-food')
  async deleteImagesFood(@Body() body: { parentId: string }) {
    return await deleteFilesFood(body.parentId);
  }
  @Post('file-tool')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationTool(
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
    const url = await uploadFileTool(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-tool')
  async deleteImageTool(@Body() body: { name: string }) {
    return await deleteFileTool(body.name);
  }
  @Post('deletes-tool')
  async deleteImagesTool(@Body() body: { parentId: string }) {
    return await deleteFilesTool(body.parentId);
  }
  @Post('file-glasses')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationGlasses(
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
    const url = await uploadFileGlasses(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-glasses')
  async deleteImageGlasses(@Body() body: { name: string }) {
    return await deleteFileGlasses(body.name);
  }
  @Post('deletes-glasses')
  async deleteImagesGlasses(@Body() body: { parentId: string }) {
    return await deleteFilesGlasses(body.parentId);
  }

  @Post('file-furniture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationFurniture(
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
    const url = await uploadFileFurniture(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-furniture')
  async deleteImageFurniture(@Body() body: { name: string }) {
    return await deleteFileFurniture(body.name);
  }
  @Post('deletes-furniture')
  async deleteImagesFurniture(@Body() body: { parentId: string }) {
    return await deleteFilesFurniture(body.parentId);
  }

  @Post('file-engine')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidationEngine(
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
    const url = await uploadFileEngine(file, body.parentId, body.siteId);
    return {
      url,
    };
  }

  @Post('delete-engine')
  async deleteImageEngine(@Body() body: { name: string }) {
    return await deleteFileEngine(body.name);
  }
  @Post('deletes-engine')
  async deleteImagesEngine(@Body() body: { parentId: string }) {
    return await deleteFilesEngine(body.parentId);
  }
}
