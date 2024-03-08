<template>
  <article
    class="w-[90%] h-[calc(100%-102px)] bg-gray-800 rounded-lg absolute border-gray-600 border-[0.1px]"
    :style="offsetObject"
  >
    <div class="absolute px-3 flex w-full">
      <div class="flex gap-2 py-3 items-center">
        <button
          class="bg-red-600 rounded-full w-3 h-3"
          @click.stop="removeProgram"
        ></button>
        <button class="bg-yellow-600 rounded-full w-3 h-3"></button>
        <button class="bg-green-600 rounded-full w-3 h-3"></button>
      </div>
      <p
        class="grow flex items-center justify-center text-gray-400"
        @mousedown="handleDragStart"
        @mousemove="handleDrop"
        @mouseup="handleMouseUp"
      >
        {{ program }}
      </p>
    </div>
    <div class="absolute right-0 top-0 h-full cursor-col-resize w-[2px]"></div>
    <div
      class="mt-10 w-full h-[calc(100%-40px)]"
      v-if="programInfo"
      @click="setProgram"
    >
      <iframe
        @click="setProgram"
        v-if="programInfo.src"
        :src="programInfo.src"
        :title="programInfo.name"
        frameborder="0"
        height="100%"
        width="100%"
      ></iframe>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useProgramStore } from "~/stores/program";
import { PROGRAM_LIST } from "~/common/constants";

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
const programInfo = PROGRAM_LIST.find((e) => e.name === program);
// 스토어 생성
const store = useProgramStore();

const { getProgram, getCurrentProgram } = storeToRefs(store);

const isDrag = ref(false);
const initOffset = reactive({
  offsetX: index * 20,
  offsetY: 0,
});
const offsetObject = reactive({
  left: initOffset.offsetX + "px",
  top: initOffset.offsetY + "px",
  zIndex: getProgram.value.indexOf(program),
});

const removeProgram = () => {
  if (getCurrentProgram.value === program) {
    store.deleteProgram(program);
  } else {
    setProgram();
  }
};
const setProgram = () => {
  store.addProgram(program);
};
watch(getProgram, (item) => {
  const zindex = item.indexOf(program);
  offsetObject.zIndex = zindex > -1 ? zindex : 0;
});

const handleDragStart = (e: MouseEvent) => {
  initOffset.offsetX = e.pageX - initOffset.offsetX;
  initOffset.offsetY = e.pageY - initOffset.offsetY;
  isDrag.value = true;
  setProgram();
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
