import { error, message, ans } from "../utils/chalk.js";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { config } from "../config.js";
import path from "path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: config.region });
const docClient = DynamoDBDocumentClient.from(client);

const upload = async function (filePath, res, role) {
  const uniqueId = Date.now();
  const fileName = path.basename(filePath);
  try {
    const params = {
      TableName: config.dynamoDBTableName,
      Item: {
        uniqueID: uniqueId,
        FileName: fileName,
        Response: res,
        Role: role,
      },
    };
    await docClient.send(new PutCommand(params));
    console.log(message("Data uploaded successfully."));
    return uniqueId;
  } catch (e) {
    console.log(error(e));
  }
};

const fetch = async function (id) {
  try {
    const params = {
      TableName: config.dynamoDBTableName,
      Key: {
        uniqueID: id,
      },
    };
    const res = await docClient.send(new GetCommand(params));
    if (!res) return console.log(message("Did not found any item"));
    return res;
  } catch (e) {
    console.log(error(e));
  }
};

const data = async function () {
  try {
    const params = {
      TableName: config.dynamoDBTableName,
      Select: "ALL_ATTRIBUTES",
      // AttributesToGet: ["uniqueID", "FileName", "Response"],
    };
    const ans = await client.send(new ScanCommand(params));
    if (!ans) console.log(error("Error fetching data"));
    return ans.Items;
  } catch (e) {
    console.log(error(e));
  }
};

export { upload, fetch, data };
