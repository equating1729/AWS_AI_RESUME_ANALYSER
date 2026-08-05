import { Command } from "commander";
import { analyse } from "./src/commands/analyse.js";
import { history } from "./src/commands/history.js";
import { show } from "./src/commands/show.js";
const program = new Command();
program
  .name("AI-Resume-Analyser")
  .description("Makes use of AWS and AI to analyse resume and gives feddback")
  .version("1.0.0");

program
  .command("analyse")
  .description(
    "stores the resume in S3 bucket and analyses the resume and returns an id associated with it",
  )
  .argument("<resume>")
  .action(async (resume) => await analyse(resume));
program
  .command("history")
  .description("Returns a history of resumes uploaded with its id")
  .action(() => history());
program
  .command("show")
  .description("shows the results of requested resume")
  .argument("<resume_id>")
  .action((id) => show(id));
program.parse();
