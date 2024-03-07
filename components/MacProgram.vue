<template>
  <article
    class="w-full h-full bg-gray-800 rounded-lg absolute border-gray-600 border-[0.1px]"
  >
    <div class="absolute px-3 flex gap-2 top-3">
      <button
        class="bg-red-600 rounded-full w-3 h-3"
        @click="removeProgram"
      ></button>
      <button class="bg-yellow-600 rounded-full w-3 h-3"></button>
      <button class="bg-green-600 rounded-full w-3 h-3"></button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useProgramStore } from "~/stores/program";

const props = defineProps({
  program: {
    type: String,
    required: true,
  },
});
const { program } = props;

// 스토어 생성
const store = useProgramStore();

const removeProgram = () => {
  store.deleteProgram(program);
};
</script>

<style></style>
