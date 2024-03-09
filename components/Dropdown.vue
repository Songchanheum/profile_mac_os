<template>
  <div
    class="z-50 px-4 text-sm flex flex-col absolute top-2 bg-slate-600 bg-opacity-30 rounded-lg backdrop-blur border-[0.5px] border-gray-200"
    :style="offsetSize"
  >
    <div class="z-50 border-b-[1px] border-gray-500 py-2">
      <dl
        class="p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
      >
        이 사람에 관하여
      </dl>
    </div>
    <div class="z-50 border-b-[1px] border-gray-500 py-2">
      <dl
        class="p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
      >
        Contact Me
      </dl>
      <dl
        class="p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
      >
        이력서
      </dl>
      <dl
        class="group flex relative justify-between p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
      >
        <p>프로젝트</p>
        <p>〉</p>
        <div
          class="p-2 hidden group-hover:flex flex-col w-40 h-fit absolute -right-40 bg-slate-600 bg-opacity-30 rounded-lg backdrop-blur border-[0.5px] border-gray-200"
        >
          <NuxtLink
            href="https://songsintroduce.vercel.app/main"
            target="_blank"
          >
            <dl
              class="p-1 flex w-full gap-2 hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
            >
              <img src="/program/profile.png" class="w-5 h-5" />
              <p>포트폴리오</p>
            </dl>
          </NuxtLink>

          <NuxtLink href="https://songsintroduce.vercel.app/" target="_blank">
            <dl
              class="p-1 flex w-full gap-2 hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
            >
              <img src="/program/dailydev.png" class="w-5 h-5" />
              <p>Daily Dev</p>
            </dl>
          </NuxtLink>

          <NuxtLink href="https://songsblog.vercel.app/" target="_blank">
            <dl
              class="p-1 flex w-full gap-2 hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
            >
              <img src="/program/blog.png" class="w-5 h-5" />
              <p>Blog Page</p>
            </dl>
          </NuxtLink>
          <NuxtLink href="https://github.com/Songchanheum" target="_blank">
            <dl
              class="p-1 flex w-full gap-2 hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
            >
              <img src="/program/github.png" class="w-5 h-5" />
              <p>Github Page</p>
            </dl>
          </NuxtLink>
        </div>
      </dl>
    </div>
    <div class="z-50 py-2">
      <NuxtLink to="/">
        <dl
          class="p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
        >
          화면 잠금
        </dl></NuxtLink
      >
      <NuxtLink to="/">
        <dl
          class="p-1 w-full hover:bg-gray-200 hover:bg-opacity-30 rounded-md cursor-pointer"
        >
          Song Chanheum 로그아웃
        </dl></NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
const { type, dropdownClose } = defineProps({
  type: {
    type: String,
    required: true,
    default: "info",
  },
  dropdownClose: {
    type: Function,
    required: true,
  },
});

const offsetSize = reactive({
  width: "205px",
  height: "fit-content",
});

const close = () => {
  dropdownClose();
};

onMounted(() => {
  console.log("mount");
  window.addEventListener("click", close);
});
onUnmounted(() => {
  console.log("unmount");
  window.removeEventListener("click", close);
});
</script>

<style></style>
