import dotenv from "dotenv";
dotenv.config();

export const config = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  dynamoDBTableName: process.env.DYNAMODB_TABLE_NAME,
  s3BucketName: process.env.AWS_BUCKET_NAME,
};
