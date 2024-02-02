"use server";

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY!,
  },
});

export const s3Upload = async (file: any, fileName: any) => {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/*",
  };

  const command = new PutObjectCommand(params);
  try {
    const res = await s3Client.send(command);
    console.log("File uploaded", res);
    return fileName;
  } catch (error) {
    console.log(error);
  }
};

export async function uploadFile(prevState: any, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { status: "error", message: "No file selected." };
    }

    if (file?.size === 0) {
      return { status: "error", message: "File is empty." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await s3Upload(buffer, file.name);

    revalidatePath("/");
    return { status: "success", message: "File has been upload." };
  } catch (error) {
    return { status: "error", message: "Failed to upload file." };
  }
}
