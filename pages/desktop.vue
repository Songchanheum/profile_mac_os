<template>
  <section class="w-full h-[calc(100%-40px)] relative overflow-hidden">
    <div v-for="(item, idx) in getProgram" :key="idx">
      <MacProgram :program="item" :index="idx" />
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
</script>

<style></style>
