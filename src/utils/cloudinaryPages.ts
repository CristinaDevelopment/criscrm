import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

export const uploadFilePages = async (
  file: any,
  parentId: string,
  siteId: string,
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_PAGES,
    api_key: process.env.CLOUDINARY_API_KEY_PAGES,
    api_secret: process.env.CLOUDINARY_API_SECRET_PAGES,
  });

  const uniqueFilename = new Date().toISOString();
  const result = await new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: uniqueFilename,
          format: 'JPEG',
          tags: [parentId, siteId],
        }, // directory and tags are optional
        (err, image) => {
          if (err) {
            reject(err);
          }
          resolve(image);
        },
      )
      .end(file.buffer);
  });

  // tslint:disable-next-line:no-string-literal
  return result['secure_url'];
};

export const deleteFilePages = async (name: string): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_PAGES,
    api_key: process.env.CLOUDINARY_API_KEY_PAGES,
    api_secret: process.env.CLOUDINARY_API_SECRET_PAGES,
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
};
export const deleteFilesPages = async (parentId: string): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_PAGES,
    api_key: process.env.CLOUDINARY_API_KEY_PAGES,
    api_secret: process.env.CLOUDINARY_API_SECRET_PAGES,
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
};
