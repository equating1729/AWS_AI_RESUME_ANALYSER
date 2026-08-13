import { error } from "../utils/chalk.js";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { config } from "../config.js";
const analyser = async function (text, userRole) {
  try {
    const region = config.region;
    const model = "openai.gpt-oss-20b-1:0";
    const client = new BedrockRuntimeClient({ region });
    const requestBody = {
      messages: [
        {
          role: "system",
          content: `You are an expert ATS and technical recruiter.Analyze the provided resume based on given role = ${userRole} and return: 
      Overall Score (0-100) for given ${userRole},ATS Score (0-100),Strengths,Weaknesses, Missing Skills, Suggestions for Improvement, 
      Final Verdict (Excellent, Good, Average, or Needs Improvement), Provide only factual, 
      constructive feedback based on the role. Do not invent information. 
      Respond ONLY with valid JSON matching this exact structure, no markdown, no code fences, no extra text before or after:
    {
        "overallScore": number,
        "atsScore": number,
        "strengths": string[],
        "weaknesses": string[],
        "missingSkills": string[],
        "suggestions": string[],
        "verdict": "Excellent" | "Good" | "Average" | "Needs Improvement"
    }`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    };

    const command = new InvokeModelCommand({
      modelId: model,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(requestBody),
    });
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const raw = responseBody.choices[0].message.content;
    const withoutReasoning = raw.replace(
      /<reasoning>[\s\S]*?<\/reasoning>/,
      "",
    );
    const cleaned = withoutReasoning.replace(/```json\n?|```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    // console.log(parsed);
    return parsed;
  } catch (e) {
    console.log(error(e));
    throw e;
  }
};
export { analyser };
