<template>
  <button
    @click="setProgram"
    class="h-10 w-10 bg-white rounded-xl opacity-90 hover:scale-125 transition-transform ease-in-out duration-200"
  >
    <img :src="`/program/${img}`" class="rounded-xl" />
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
</script>
