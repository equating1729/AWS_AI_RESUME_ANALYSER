import { data } from "../services/dynamo.js";

const history = async function () {
  const report = await data();
  if (!report) console.log("Try Again later");
  console.log(report);
};
export { history };
