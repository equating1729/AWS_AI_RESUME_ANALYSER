import { fetch } from "../services/dynamo.js";
import { error, message, ans } from "../utils/chalk.js";

const show = async function (id) {
  try {
    const result = await fetch(Number(id));
    console.log(message("Here is the Analysis of your resume: "));
    const response = result.Item.Response;
    console.log(response);
    
  } catch (e) {
    console.log(error(e));
  }
};
export { show };
