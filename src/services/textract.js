import pdfParse from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";

export const extractText = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};
