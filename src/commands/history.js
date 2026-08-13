import { data } from "../services/dynamo.js";
import { error, message, ans } from "../utils/chalk.js";

const history = async function () {
  const report = await data();
  if (!report) console.log(message("Try Again later"));
  console.log(report);
};
export { history };
