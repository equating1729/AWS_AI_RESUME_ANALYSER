import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config.js";
import fs from "fs";
import path from "path";
import { error, message, ans } from "../utils/chalk.js";

//sdk autoloads the access key and screet key no need to define in here
const s3Client = new S3Client({
  region: config.region,
});
export const uploadFile = async function (filePath) {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const params = {
    Bucket: config.s3BucketName,
    Key: fileName,
    Body: fileContent,
  };
  await s3Client.send(new PutObjectCommand(params)).then((data) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(error("Error deleting file:"), err);
        } else {
          console.log(message("File Uploaded successfully."));
        }
      });
    }
  });
};
