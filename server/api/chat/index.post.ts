import { kv } from "@vercel/kv";
export default defineEventHandler(async (event) => {
  const {
    id,
    name,
    imgUrl,
    message,
  }: { id: string; name: string; imgUrl: string; message: string } =
    await readBody(event);
  const messageKV = await kv.rpush(
    `messageChat`,
    `{"id" : "${id}", "name" : "${name}", "imgUrl" : "${imgUrl}", "message" : "${message.replaceAll(
      "\n",
      "\\n"
    )}"}`
  );
  return messageKV;
});
