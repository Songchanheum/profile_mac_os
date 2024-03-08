<template>
  <article
    class="w-[90%] h-[calc(100%-102px)] bg-gray-800 rounded-lg absolute border-gray-600 border-[0.1px]"
    :style="offsetObject"
  >
    <div
      class="absolute px-3 flex w-full"
      @mousedown="handleDragStart"
      @mousemove="handleDrop"
      @mouseup="handleMouseUp"
    >
      <div class="flex gap-2 py-3 items-center">
        <button
          class="bg-red-600 rounded-full w-3 h-3"
          @click="removeProgram"
        ></button>
        <button class="bg-yellow-600 rounded-full w-3 h-3"></button>
        <button class="bg-green-600 rounded-full w-3 h-3"></button>
      </div>
      <p class="grow flex items-center justify-center text-gray-400">
        {{ program }}
      </p>
    </div>
    <div class="mt-10 w-full h-[calc(100%-40px)]">
      <iframe
        v-if="program === 'Chrome'"
        src="https://www.google.com/webhp?igu=1"
        frameborder="0"
        height="100%"
        width="100%"
        title="Chrome"
      ></iframe>
      <iframe
        v-if="program === 'Visual Studio Code'"
        src="https://github1s.com/Songchanheum/profile_mac_os/blob/main/pages/index.vue"
        frameborder="0"
        height="100%"
        width="100%"
        title="VSCode"
      ></iframe>

      <iframe
        v-if="program === 'Songs blog'"
        src="https://songsblog.vercel.app/"
        frameborder="0"
        height="100%"
        width="100%"
        title="Chrome"
      ></iframe>
      <iframe
        v-if="program === 'Github'"
        src="https://github.com/Songchanheum/"
        frameborder="0"
        height="100%"
        width="100%"
        title="Chrome"
      ></iframe>
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
  index: {
    type: Number,
    required: true,
  },
});
const { program, index } = props;

// 스토어 생성
const store = useProgramStore();

const removeProgram = () => {
  store.deleteProgram(program);
};
const isDrag = ref(false);
const initOffset = reactive({
  offsetX: index * 20,
  offsetY: 0,
});
const offsetObject = reactive({
  left: initOffset.offsetX + "px",
  top: initOffset.offsetY + "px",
});

const handleDragStart = (e: MouseEvent) => {
  initOffset.offsetX = e.pageX - initOffset.offsetX;
  initOffset.offsetY = e.pageY - initOffset.offsetY;
  isDrag.value = true;
};
const handleDrop = (e: MouseEvent) => {
  if (isDrag.value) {
    const compX = e.pageX - initOffset.offsetX;
    const compY = e.pageY - initOffset.offsetY;
    offsetObject.left = (compX > 0 ? compX : 0) + "px";
    offsetObject.top = (compY > 0 ? compY : 0) + "px";
  }
};
const handleMouseUp = () => {
  isDrag.value = false;
  initOffset.offsetX = Number(offsetObject.left.split("px")[0]);
  initOffset.offsetY = Number(offsetObject.top.split("px")[0]);
};
</script>

<style></style>
