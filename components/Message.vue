<template>
  <main
    class="w-full h-full bg-black/30 flex flex-col justify-between text-white"
  >
    <section></section>
    <section class="min-h-24 h-auto">
      <article
        v-if="oAuthUserInfo.name === ''"
        class="p-2 flex flex-col gap-2 items-center"
      >
        <div class="flex gap-2 items-center">
          <button id="googleButton"></button>
          <a
            class="bg-white rounded-full w-[31px] h-[31px] p-[5px]"
            href="/api/gitauth"
          >
            <img src="/public/program/github.png" />
          </a>
        </div>
        <p>로그인 후 이용하실 수 있습니다.</p>
      </article>
      <article v-else class="p-2 flex flex-col gap-2">
        <div class="flex items-center gap-1">
          <img
            :src="oAuthUserInfo.imgUrl"
            width="35"
            height="35"
            class="bg-white rounded-full"
          />
          <p>{{ oAuthUserInfo.name }}</p>
        </div>
        <div class="flex flex-col">
          <textarea
            class="p-2 rounded-lg bg-white/20 flex-shrink w-full h-full resize-none focus-visible:outline-none"
          />
        </div>
      </article>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { jwtDecode } from "jwt-decode";
const runtimeConfig = useRuntimeConfig();

const oAuthUserInfo = reactive({
  name: "",
  imgUrl: "",
});

const loginType = useCookie("login_type", {
  watch: true,
});

onMounted(() => {
  if (!loginType.value) {
    google.accounts.id.initialize({
      client_id: runtimeConfig.public.GOOGLE_CLIENT_ID || "", //클라이언트 ID
      callback: handleCredentialResponse,
      context: "use", //원탭 프롬프트 제목 및 메시지 설정  "use ->default"
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton") as HTMLElement,
      {
        theme: "outline",
        size: "medium",
        type: "icon",
        shape: "circle",
        logo_alignment: "center",
        text: "signin",
      } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  } else {
    const cookieName =
      loginType.value === "github" ? "github_oauth_user" : "google_oauth_user";
    const user = useCookie<any>(cookieName);
    const userInfo = user.value;
    oAuthUserInfo.name = userInfo.name;
    oAuthUserInfo.imgUrl = userInfo.imgUrl;
  }
});

const handleCredentialResponse = (ref: any) => {
  const decoded = jwtDecode<any>(ref.credential);
  oAuthUserInfo.name = decoded.name;
  oAuthUserInfo.imgUrl = decoded.picture;

  const loginType = useCookie("login_type", { maxAge: 60 * 10 });
  loginType.value = "google";
  const userAuth = useCookie("google_oauth_user");
  userAuth.value = JSON.stringify(oAuthUserInfo);
  console.log(decoded);
};
</script>

<style></style>
