import { fetch } from "../services/dynamo.js";

const show = async function (id) {
  try {
    const result = await fetch(Number(id));
    console.log("Here is the Analysis of your resume: ");
    console.log(result.Item.Response);
  } catch (e) {
    console.log(e);
  }
};
export { show };
