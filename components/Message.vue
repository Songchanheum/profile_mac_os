<template>
  <main
    class="w-full h-full bg-black/30 flex flex-col justify-between text-white"
  >
    <section
      class="w-full h-auto max-h-[calc(100%-100px)] overflow-x-hidden text-wrap p-2"
      ref="sectionRef"
    >
      <div class="flex flex-col gap-2">
        <div
          v-for="(item, idx) in messageChat"
          :key="idx"
          class="relative group"
        >
          <div class="flex gap-2" v-if="item.id !== oAuthUserInfo.id">
            <div class="min-w-[30px]">
              <img
                :src="item.imgUrl"
                width="30"
                height="30"
                class="bg-white rounded-full"
              />
            </div>
            <div class="flex flex-col gap-1 w-full">
              <p class="text-sm font-semibold">{{ item.name }}</p>
              <p
                class="whitespace-pre-line break-words bg-violet-800 px-4 py-1 rounded-2xl w-fit max-w-[90%] text-sm rounded-tl-none"
              >
                {{ item.message }}
              </p>
              <button
                v-if="oAuthUserInfo.id === 'bsk9212@gmail.com'"
                class="group-hover:block hidden absolute top-10 left-1 px-2 rounded-full bg-slate-600"
                @click="removeChatMessage($event, idx)"
              >
                X
              </button>
            </div>
          </div>
          <div v-else class="flex justify-end">
            <p
              class="whitespace-pre-line break-words bg-gray-200 text-black px-4 py-1 rounded-2xl w-fit max-w-[90%] text-sm rounded-tr-none"
            >
              {{ item.message }}
            </p>
          </div>
        </div>
      </div>
    </section>
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
    <article
      v-else
      class="p-2 flex flex-col gap-2 h-auto min-h-20 absolute bottom-0 w-full max-h-[253px]"
      ref="articleRef"
    >
      <div class="flex items-center gap-2">
        <img
          :src="oAuthUserInfo.imgUrl"
          width="30"
          height="30"
          class="bg-white rounded-full"
        />
        <p>{{ oAuthUserInfo.name }}</p>
      </div>
      <div class="flex items-end gap-2">
        <textarea
          rows="1"
          class="py-1 px-2 max-h-[200px] rounded-xl border-[1px] border-gray-600 bg-transparent w-full resize-none focus-visible:outline-none"
          ref="textStyle"
          @input="textChange"
        />
        <button
          class="w-16 h-8 rounded-lg bg-white/10"
          @click="postMessageChat"
        >
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const runtimeConfig = useRuntimeConfig();

const oAuthUserInfo = reactive({
  id: "",
  name: "",
  imgUrl: "",
});

type MessageType = {
  id?: string;
  name?: string;
  imgUrl?: string;
  message?: string;
};
const messageChat = ref<MessageType[]>([]);
const textStyle = ref<HTMLInputElement | null>(null);
const sectionRef = ref<HTMLElement | null>(null);
const articleRef = ref<HTMLElement | null>(null);

const loginType = useCookie("login_type", {
  watch: true,
});

const textChange = () => {
  if ((textStyle.value as HTMLInputElement).scrollHeight <= 200) {
    (textStyle.value as HTMLInputElement).style.height = "auto";
    (textStyle.value as HTMLInputElement).style.height =
      (textStyle.value as HTMLInputElement).scrollHeight + 4 + "px";
    (articleRef.value as HTMLElement).style.height =
      (textStyle.value as HTMLInputElement).scrollHeight + 54 + "px";
    (sectionRef.value as HTMLElement).style.marginBottom =
      (textStyle.value as HTMLInputElement).scrollHeight + 54 + "px";
    (sectionRef.value as HTMLDivElement).scrollTo({
      top: (sectionRef.value as HTMLDivElement).scrollHeight,
      behavior: "smooth",
    });
  }
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
  getMessageChat();
});
onUpdated(() => {
  (sectionRef.value as HTMLDivElement).scrollTo({
    top: (sectionRef.value as HTMLDivElement).scrollHeight,
    behavior: "smooth",
  });
});

const getMessageChat = () => {
  axios.get("/api/chat").then((response) => {
    messageChat.value = response.data;
  });
};

const postMessageChat = () => {
  axios
    .post("/api/chat", {
      ...oAuthUserInfo,
      message: (textStyle.value as HTMLInputElement).value,
    })
    .then(() => {
      (textStyle.value as HTMLInputElement).value = "";
      textChange();
      getMessageChat();
    });
};
const removeChatMessage = (e: Event, idx: number) => {
  axios
    .patch("/api/chat", {
      index: idx,
    })
    .then(() => {
      getMessageChat();
    });
};

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
