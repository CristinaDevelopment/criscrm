import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryEnviroments } from 'src/utils/cloudinary';
import { uuidv4 } from 'src/utils';
dotenv.config();

@Injectable()
export class UploadService {
  async uploadFile(
    file: any,
    siteId: string,
    parentId: string,
    type: string,
  ): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });

    const result = await new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: uuidv4(),
            format: 'JPEG',
            tags: [siteId, parentId],
          },
          (err, image) => {
            if (err) {
              reject(err);
            }
            resolve(image);
          },
        )
        .end(file.buffer);
    });
    return result['secure_url'];
  }
  async deleteFile(name: string, type: string): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });
    await new Promise(async (resolve, reject) => {
      cloudinary.uploader.destroy(
        name, // directory and tags are optional
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      );
    });
    return 'image delete';
  }

  async deleteFiles(parentId: string, type: string): Promise<string> {
    cloudinaryEnviroments.map((data) => {
      if (type === data.type) return cloudinary.config(data.enviroment);
    });

    await new Promise(async (resolve, reject) => {
      cloudinary.api.delete_resources_by_tag(
        parentId, // directory and tags are optional
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      );
    });
    return 'images delete';
  }
}
