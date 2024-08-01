"use server";
import { cloudinary } from "@/middlewares/cloudinary.config";

const useCloudinaryUpload = async (
  fileStream: Buffer,
  folder: string,
  filename: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          public_id: filename,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      )
      .end(fileStream);
  });
};

export { useCloudinaryUpload };
