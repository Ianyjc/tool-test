import dotenv from "dotenv"
import { ChatOpenAI } from "@langchain/openai";

dotenv.config();

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME || "qwen-coder-turbo",
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
});

const stream = await model.stream("介绍下自己");
let fullContent = '';

console.log("📡 接收流式数据:\n");

for await(const chunk of stream) {
    const content = chunk.content;
    fullContent += content;

    process.stdout.write(content); // 实时显示流式文本
}
