<template>
  <button @click="setProgram" class="h-10 w-10 bg-white rounded-xl opacity-90">
    <img :src="`_nuxt/assets/images/program/${img}`" />
  </button>
</template>

<script lang="ts" setup>
import { useProgramStore } from "~/stores/program";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
const { name, img } = props;

// 스토어 생성
const store = useProgramStore();

const setProgram = () => {
  store.addProgram(name);
};

const getImageUrl = (img: string) => {
  const url = new URL(`/assets/images/program/${img}`, import.meta.url).href;
  return url;
};
</script>
