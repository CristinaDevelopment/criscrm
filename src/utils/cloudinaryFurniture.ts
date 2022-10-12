import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

export const uploadFileFurniture = async (
  file: any,
  parentId: string,
  siteId: string,
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_FURNITURE,
    api_key: process.env.CLOUDINARY_API_KEY_FURNITURE,
    api_secret: process.env.CLOUDINARY_API_SECRET_FURNITURE,
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

export const deleteFileFurniture = async (name: string): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_FURNITURE,
    api_key: process.env.CLOUDINARY_API_KEY_FURNITURE,
    api_secret: process.env.CLOUDINARY_API_SECRET_FURNITURE,
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
export const deleteFilesFurniture = async (
  parentId: string,
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME_FURNITURE,
    api_key: process.env.CLOUDINARY_API_KEY_FURNITURE,
    api_secret: process.env.CLOUDINARY_API_SECRET_FURNITURE,
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
