import { kv } from "@vercel/kv";
export default defineEventHandler(async (event) => {
  const messageChat = await kv.lrange(`messageChat`, 0, -1);
  return messageChat;
});
