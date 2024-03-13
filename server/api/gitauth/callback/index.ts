// server/routes/login/github/callback.get.ts
import { OAuth2RequestError } from "arctic";
import { github } from "~/common/github";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser = await githubUserResponse.json();
    console.log(githubUser);
    const userInfo: GithubUserInfo = {
      id: githubUser.login,
      name: githubUser.name,
      imgUrl: githubUser.avatar_url,
    };
    setCookie(event, "login_type", "github", {
      path: "/",
      maxAge: 60 * 10,
    });
    setCookie(event, "github_oauth_user", JSON.stringify(userInfo), {
      path: "/",
      maxAge: 60 * 10,
    });
    return sendRedirect(event, "/desktop");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

type GithubUserInfo = {
  id: string;
  name: string;
  imgUrl: string;
};
