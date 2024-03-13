// server/routes/login/github/index.get.ts
import { github } from "~/common/github";
import * as crypto from "crypto";

export default defineEventHandler(async (event) => {
  const state = crypto.randomBytes(16).toString("base64");
  const url = await github.createAuthorizationURL(state);

  setCookie(event, "github_oauth_state", state, {
    path: "/",
    secure: false,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  return sendRedirect(event, url.toString());
});
