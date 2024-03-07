<template>
  <section
    v-if="getProgram !== null && getProgram !== '' && getProgram"
    class="w-full h-[calc(100%-102px)] flex bg-gray-800 flex-col rounded-lg relative"
  >
    <div class="absolute px-3 flex gap-2 top-3">
      <button
        class="bg-red-600 rounded-full w-3 h-3"
        @click="removeProgram"
      ></button>
      <button class="bg-yellow-600 rounded-full w-3 h-3"></button>
      <button class="bg-green-600 rounded-full w-3 h-3"></button>
      {{ getProgram }}
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "desktop-layout",
});
import { storeToRefs } from "pinia";
import MacProgram from "~/components/MacProgram.vue";
import { useProgramStore } from "~/stores/program";

// 스토어 생성
const store = useProgramStore();
// 반응형 객체로 변환
const { getProgram } = storeToRefs(store);
console.log(getProgram.value);

const removeProgram = () => {
  store.deleteProgram(getProgram.value);
};
</script>

<style></style>
