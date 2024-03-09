<template>
  <div
    class="w-[100wv] h-[100vh] bg-cover"
    :style="{ 'background-image': 'url(' + url + ')' }"
  >
    <MacHeader :isDesktop="true" />
    <slot />
    <div
      class="z-50 flex items-center gap-4 justify-center w-fit px-2 h-14 bg-white bg-opacity-10 border-gray-400 border-[1px] rounded-xl absolute bottom-1 left-[50%] -translate-x-[50%]"
    >
      <dl v-for="(item, idx) in PROGRAM_LIST" class="flex items-start">
        <MacIcon :name="item.name" :img="item.img" />
      </dl>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PROGRAM_LIST } from "~/common/constants";
import MacHeader from "~/components/MacHeader.vue";

const url = ref("");

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
