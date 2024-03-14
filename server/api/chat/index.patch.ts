import { kv } from "@vercel/kv";
export default defineEventHandler(async (event) => {
  const { index }: { index: number } = await readBody(event);
  const getMessage = await kv.lindex("messageChat", index);
  const replaceMessage = JSON.stringify(getMessage)
    .replaceAll(":", " : ")
    .replaceAll(",", ", ")
    .replaceAll("https : ", "https:");
  const count = await kv.lrem("messageChat", 1, replaceMessage);

  return count;
});
