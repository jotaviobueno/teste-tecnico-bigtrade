import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { environment } from "../../Config";
import { HttpException } from "../../Domain/Utils";
import { File } from "../../Domain/Entities";

class S3Service {
  private readonly s3Client = new S3Client({
    region: environment.AWS_S3_REGION,
    apiVersion: "2012-08-10",
    credentials: {
      accessKeyId: environment.AWS_ACCESS_ID,
      secretAccessKey: environment.AWS_ACCESS_SECRET,
    },
  });

  async uploadSingleFile({
    file,
    path,
  }: {
    file: File;
    path: string;
  }): Promise<string> {
    try {
      const url = `${path}/${randomUUID()}.${file.mimetype.split("/")[1]}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: environment.AWS_S3_BUCKET,
          Key: url,
          Body: file.data,
          ACL: "public-read",
          ContentType: file.mimetype,
        })
      );

      return `https://${environment.AWS_S3_BUCKET}.s3.${environment.AWS_S3_REGION}.amazonaws.com/${url}`;
    } catch (e: any) {
      throw new HttpException(e.message, 500);
    }
  }

  updateManyFiles(data: { file: File; path: string }[]): Promise<string[]> {
    try {
      return Promise.all(
        data.map(async ({ file, path }) => {
          return this.uploadSingleFile({
            file,
            path,
          });
        })
      );
    } catch (e: any) {
      throw new HttpException(e.message, 500);
    }
  }
}

export default new S3Service();
