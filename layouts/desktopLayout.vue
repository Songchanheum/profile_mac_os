<template>
  <div
    class="w-[100wv] h-[100vh] bg-cover"
    :style="{ 'background-image': 'url(' + url + ')' }"
    rel="preload"
  >
    <MacHeader :isDesktop="true" />
    <slot />
    <div
      class="backdrop-blur z-50 flex items-center gap-4 justify-center w-fit px-2 h-14 bg-white/20 border-gray-400 border-[1px] rounded-xl absolute bottom-1 left-[50%] -translate-x-[50%]"
    >
      <dl v-for="(item, idx) in prList" :key="idx" class="flex items-start">
        <MacIcon :name="item.name" :img="item.img ?? ''" />
      </dl>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PROGRAM_LIST } from "~/common/constants";
import MacHeader from "~/components/MacHeader.vue";

const url = ref("");

const prList = PROGRAM_LIST.filter((e) => e.img);

onMounted(() => {
  setUrl();
  setInterval(() => setUrl(), 1000);
});

const setUrl = () => {
  const now = new Date().getHours();
  if (now > 18 || now < 6) {
    url.value = "/dark-bg.png";
  } else {
    url.value = "/light-bg.png";
  }
};
</script>
