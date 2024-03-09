<template>
  <section
    class="w-full h-[calc(100%-40px)] relative overflow-hidden z-10"
    @mousemove="resizeMove"
    @mouseup="resizeUp"
  >
    <div v-for="(item, idx) in getProgram" :key="item">
      <MacProgram
        :program="item"
        :index="idx"
        :offset="offsetObject"
        @setup-offset="setupOffset"
      />
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

const initOffset = reactive({
  offsetWidth: 0,
  offsetHeight: 0,
});
const offsetObject = reactive({
  width: "",
  height: "",
});

const resizeRef = ref((e: MouseEvent) => {});
const finishRef = ref(() => {});

const setupOffset = (offset: any, finish: any) => {
  resizeRef.value = offset;
  finishRef.value = finish;
};
const resizeMove = (e: MouseEvent) => {
  resizeRef.value(e);
};
const resizeUp = () => {
  finishRef.value();
  resizeRef.value = (e: MouseEvent) => {};
};
</script>

<style></style>
