<template>
  <article
    :class="
      `bg-gray-800 rounded-lg absolute border-gray-600 border-[0.1px] duration-300 ` +
      duration
    "
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
    <div class="absolute flex gap-2 p-3 items-center group">
      <button
        class="bg-red-500 rounded-full w-3 h-3"
        @click.stop="removeProgram"
      >
        <!-- <p class="group-hover:block hidden">x</p> -->
      </button>
      <button
        class="bg-yellow-500 rounded-full w-3 h-3"
        @click.stop="removeProgram"
      >
        <!-- <p class="group-hover:block hidden">x</p> -->
      </button>
      <button
        class="bg-green-500 rounded-full w-3 h-3"
        @click.stop="toggleSize"
      >
        <!-- <p class="group-hover:block hidden">x</p> -->
      </button>
    </div>
    <div
      class="mt-9 mx-auto w-full h-[calc(100%-36px)]"
      v-if="programInfo"
      @click="setProgram"
    >
      <div
        class="absolute -right-[1px] top-0 h-full cursor-col-resize w-[2px] z-50"
        @mousedown="resizeDown($event, 'right')"
        v-if="programInfo.comp"
      ></div>
      <div
        class="absolute -left-[1px] top-0 h-full cursor-col-resize w-[2px]"
        @mousedown="resizeDown($event, 'left')"
        v-if="programInfo.comp"
      ></div>
      <div
        class="absolute left-0 -bottom-[1px] w-full cursor-row-resize h-[2px]"
        @mousedown="resizeDown($event, 'bottom')"
        v-if="programInfo.comp"
      ></div>
      <iframe
        @click="setProgram"
        v-if="programInfo.src"
        :src="programInfo.src"
        :title="programInfo.name"
        frameborder="0"
        height="100%"
        width="100%"
      ></iframe>
      <Resume v-if="programInfo.comp && programInfo.name === 'Resume'" />
      <Message v-if="programInfo.comp && programInfo.name === 'Message'" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useProgramStore } from "~/stores/program";
import {
  FULL_SIZE,
  PROGRAM_LIST,
  SMALL_FIX_SIZE,
  SMALL_SIZE,
} from "~/common/constants";

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
//true > fullsize, false > resize
const isToggle = ref(true);
const duration = ref("transition-none");

const emit = defineEmits(["is-resize", "setup-offset"]);
const store = useProgramStore();

const { getProgram } = storeToRefs(store);

const sizeType =
  programInfo?.size !== "large"
    ? programInfo?.size !== "small"
      ? SMALL_FIX_SIZE
      : SMALL_SIZE
    : FULL_SIZE;
const initOffset = reactive({
  offsetX: index * 20,
  offsetY: 0,
  offsetWidth: 0,
  offsetHeight: 0,
});

const offsetObject = reactive({
  left: initOffset.offsetX + "px",
  top: initOffset.offsetY + "px",
  width: sizeType.width,
  height: sizeType.height,
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
  duration.value = "transition-none";
};
const handleDrop = (e: MouseEvent) => {
  if (isDrag.value) {
    const compX = e.pageX - initOffset.offsetX;
    const compY = e.pageY - initOffset.offsetY;
    offsetObject.left = (e.pageX > 0 ? compX : 0) + "px";
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
  duration.value = "transition-none";
};

const resizeMove = (e: MouseEvent) => {
  if (isResizeDrag.value === "right") {
    const compX = e.pageX - initOffset.offsetWidth;
    offsetObject.width = (compX > 340 ? compX : 340) + "px";
  } else if (isResizeDrag.value === "left") {
    const compWidth = initOffset.offsetX - e.pageX + initOffset.offsetWidth;
    offsetObject.left = (e.pageX > 0 ? e.pageX : 0) + "px";
    offsetObject.width = (compWidth > 340 ? compWidth : 340) + "px";
  } else if (isResizeDrag.value === "bottom") {
    const compY = e.pageY - initOffset.offsetHeight;
    offsetObject.height = (compY > 100 ? compY : 100) + "px";
  }
};

const handleMouseUp = () => {
  isDrag.value = false;
  isResizeDrag.value = "";
  initOffset.offsetX = Number(offsetObject.left.split("px")[0]);
  initOffset.offsetY = Number(offsetObject.top.split("px")[0]);
};

const toggleSize = () => {
  if (isToggle.value) {
    offsetObject.width = sizeType.halfWidth;
    offsetObject.height = sizeType.halfHeight;
  } else {
    offsetObject.width = sizeType.width;
    offsetObject.height = sizeType.height;
    offsetObject.left = "0px";
    offsetObject.top = "0px";
  }
  initOffset.offsetX = Number(offsetObject.left.split("px")[0]);
  initOffset.offsetY = Number(offsetObject.top.split("px")[0]);
  isToggle.value = !isToggle.value;
  duration.value = "transition-all";
};
</script>

<style></style>
