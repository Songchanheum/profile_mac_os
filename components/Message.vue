<template>
  <main
    class="w-full h-full bg-black/30 flex flex-col justify-between text-white"
  >
    <section class="h-auto w-full overflow-auto"></section>
    <article
      v-if="oAuthUserInfo.id === ''"
      class="p-2 flex flex-col gap-2 items-center min-h-20 h-auto"
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
    <article v-else class="p-2 flex flex-col gap-2 h-fit min-h-20">
      <div class="flex items-center gap-2">
        <img
          :src="oAuthUserInfo.imgUrl"
          width="30"
          height="30"
          class="bg-white rounded-full"
        />
        <p>{{ oAuthUserInfo.name }}</p>
      </div>
      <div class="flex items-end grow gap-2">
        <textarea
          rows="1"
          class="py-1 px-2 max-h-[200px] rounded-xl border-[1px] border-gray-600 bg-transparent w-full resize-none focus-visible:outline-none"
          ref="textStyle"
          @input="textChange"
        />
        <button class="w-16 h-8 rounded-lg bg-white/10">
          <img
            src="/assets/images/send.png"
            width="20"
            height="20"
            class="m-auto"
            style="filter: invert(100%)"
          />
        </button>
      </div>
    </article>
  </main>
</template>
<script lang="ts" setup>
import { jwtDecode } from "jwt-decode";
const runtimeConfig = useRuntimeConfig();

const oAuthUserInfo = reactive({
  id: "",
  name: "",
  imgUrl: "",
});

const loginType = useCookie("login_type", {
  watch: true,
});

const textStyle = ref(null);

const textChange = () => {
  (textStyle.value as unknown as HTMLElement).style.height = "auto";
  (textStyle.value as unknown as HTMLElement).style.height =
    (textStyle.value as unknown as HTMLElement).scrollHeight + 4 + "px";
};
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
    oAuthUserInfo.id = userInfo.id;
    oAuthUserInfo.name = userInfo.name;
    oAuthUserInfo.imgUrl = userInfo.imgUrl;
  }
});

const handleCredentialResponse = (ref: any) => {
  const decoded = jwtDecode<any>(ref.credential);
  oAuthUserInfo.id = decoded.email;
  oAuthUserInfo.name = decoded.name;
  oAuthUserInfo.imgUrl = decoded.picture;

  const loginType = useCookie("login_type", { maxAge: 60 * 10 });
  loginType.value = "google";
  const userAuth = useCookie("google_oauth_user", { maxAge: 60 * 10 });
  userAuth.value = JSON.stringify(oAuthUserInfo);
};
</script>

<style></style>
