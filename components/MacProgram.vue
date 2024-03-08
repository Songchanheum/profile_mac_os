<template>
  <article
    class="bg-gray-800 rounded-lg absolute border-gray-600 border-[0.1px]"
    :style="offsetObject"
    ref="el"
  >
    <div class="absolute flex w-full items-center py-2">
      <p
        class="grow flex items-center justify-center text-gray-400"
        @mousedown="handleDragStart"
        @mousemove="handleDrop"
        @mouseup="handleMouseUp"
      >
        {{ program }}
      </p>
    </div>
    <div class="absolute flex gap-2 p-3 items-center">
      <button
        class="bg-red-600 rounded-full w-3 h-3"
        @click.stop="removeProgram"
      ></button>
      <button class="bg-yellow-600 rounded-full w-3 h-3"></button>
      <button class="bg-green-600 rounded-full w-3 h-3"></button>
    </div>
    <div
      class="absolute right-0 top-0 h-full cursor-col-resize w-[2px]"
      @mousedown="resizeDown($event, 'right')"
    ></div>
    <div
      class="absolute left-0 top-0 h-full cursor-col-resize w-[2px]"
      @mousedown="resizeDown($event, 'left')"
    ></div>
    <div
      class="absolute left-0 bottom-0 w-full cursor-row-resize h-[2px]"
      @mousedown="resizeDown($event, 'bottom')"
    ></div>
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
import { FULL_SIZE, PROGRAM_LIST, SMALL_SIZE } from "~/common/constants";

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
const el = ref(null);
const isDrag = ref(false);
const isResizeDrag = ref("");
const emit = defineEmits(["is-resize", "setup-offset"]);
const store = useProgramStore();

const { getProgram, getCurrentProgram } = storeToRefs(store);

const initOffset = reactive({
  offsetX: index * 20,
  offsetY: 0,
  offsetWidth: 0,
  offsetHeight: 0,
});

const offsetObject = reactive({
  left: initOffset.offsetX + "px",
  top: initOffset.offsetY + "px",
  width: programInfo?.size === "large" ? FULL_SIZE.width : SMALL_SIZE.width,
  height: programInfo?.size === "large" ? FULL_SIZE.height : SMALL_SIZE.height,
  zIndex: getProgram.value.indexOf(program),
});

const removeProgram = () => {
  store.deleteProgram(program);
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
  emit("setup-offset", handleDrop, handleMouseUp);
};
const handleDrop = (e: MouseEvent) => {
  if (isDrag.value) {
    const compX = e.pageX - initOffset.offsetX;
    const compY = e.pageY - initOffset.offsetY;
    offsetObject.left = (compX > 0 ? compX : 0) + "px";
    offsetObject.top = (compY > 0 ? compY : 0) + "px";
  }
};

const resizeDown = (e: MouseEvent, type: string) => {
  const clientWidth = (el.value as unknown as HTMLElement)?.clientWidth;
  initOffset.offsetWidth =
    type === "left" ? clientWidth : e.pageX - clientWidth;
  initOffset.offsetHeight =
    e.pageY - (el.value as unknown as HTMLElement)?.clientHeight;
  initOffset.offsetX = e.pageX;
  initOffset.offsetY = e.pageY;
  isResizeDrag.value = type;
  emit("setup-offset", resizeMove, handleMouseUp);
};

const resizeMove = (e: MouseEvent) => {
  if (isResizeDrag.value === "right") {
    const compX = e.pageX - initOffset.offsetWidth;
    offsetObject.width = (compX > 0 ? compX : 0) + "px";
  } else if (isResizeDrag.value === "left") {
    const compWidth = initOffset.offsetX - e.pageX + initOffset.offsetWidth;
    console.log(initOffset.offsetX, initOffset.offsetWidth);
    offsetObject.left = (e.pageX > 0 ? e.pageX : 0) + "px";
    offsetObject.width = compWidth + "px";
  } else if (isResizeDrag.value === "bottom") {
    const compY = e.pageY - initOffset.offsetHeight;
    offsetObject.height = (compY > 0 ? compY : 0) + "px";
  }
};

const handleMouseUp = () => {
  isDrag.value = false;
  isResizeDrag.value = "";
  initOffset.offsetX = Number(offsetObject.left.split("px")[0]);
  initOffset.offsetY = Number(offsetObject.top.split("px")[0]);
};
</script>

<style></style>
