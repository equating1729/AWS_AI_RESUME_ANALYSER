import { uploadFile } from "../services/s3.js";
import { extractText } from "../services/textract.js";
import { analyser } from "../services/bedrock.js";
import { upload } from "../services/dynamo.js";
import { error, message, ans } from "../utils/chalk.js";

let id;

export const analyse = async function (filePath, role) {
  try {
    const uploadResult = await uploadFile(filePath);
    const text = await extractText(filePath);
    const parsedRes = await analyser(text, role);
    console.log(message("Analysis Complete"));
    id = await upload(filePath, parsedRes, role);
    console.log(ans(`Analysis for ${role} Saved at ${id}`));
  } catch (e) {
    console.log(e);
  }
};
