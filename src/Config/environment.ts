export const environment = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  //
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  //
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID as string,
  AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET as string,
  AWS_S3_REGION: process.env.AWS_S3_REGION as string,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET as string,
};
