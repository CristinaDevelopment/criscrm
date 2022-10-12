import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

export const uploadFile = async (
  file: any,
  site: string,
  tag: string,
): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uniqueFilename = new Date().toISOString();
  const result = await new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `criscrm/${site}`,
          public_id: uniqueFilename,
          format: 'JPEG',
          tags: tag,
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

export const deleteFile = async (name: string): Promise<string> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
  // tslint:disable-next-line:no-string-literal
  return 'image delete';
};
