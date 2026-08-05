import { uploadFile } from "../services/s3.js";
import { extractText } from "../services/textract.js";
import { analyser } from "../services/bedrock.js";
import { upload} from "../services/dynamo.js";
let id;

export const analyse = async function (filePath) {
  try {
    const uploadResult = await uploadFile(filePath);
    const text = await extractText(filePath);
    const parsedRes = await analyser(text);
    console.log("Analysis Complete");
    id = await upload(filePath, parsedRes);
    console.log(`Analysis Saved at ${id}`);
  } catch (e) {
    console.log(e);
  }
};
