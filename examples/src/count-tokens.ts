import fs from "fs";
import chalk from "chalk";
import { FileLoader, OpenAI, prompts } from "@promptable/promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Simple example of using the OpenAI API count the tokens used in a prompt
 */
export default async function run(args: string[]) {
  const openai = new OpenAI(apiKey);

  const docs = await new FileLoader("./data/startup-mistakes.txt").load();
  const prompt = prompts
    .QA()
    .format({ document: docs[0].content, question: "" });

  const tokensUsed = openai.countTokens(prompt.text);

  console.log(chalk.white(`Token Count`), chalk.green(tokensUsed));
}
