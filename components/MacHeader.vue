<template>
  <header
    class="w-full bg-white h-10 bg-opacity-10 text-xs flex justify-between px-4 items-center text-white"
  >
    <div class="flex items-center gap-2">
      <div>
        <button
          v-if="isDesktop"
          class="w-12 h-7 rounded-lg hover:bg-slate-200 hover:bg-opacity-20 flex items-center justify-center"
        >
          <img
            src="/assets/images/apple.svg"
            width="18"
            height="18"
            @click.stop="isOpen.info = !isOpen.info"
          />
        </button>
        <transition
          enter-active-class="duration-200 ease-in"
          enter-from-class="scale-0 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-0"
        >
          <div class="relative" v-if="isOpen.info">
            <Dropdown :type="'info'" :dropdownClose="dropdownClose" />
          </div>
        </transition>
      </div>
      <p class="text-sm font-bold" v-if="getCurrentProgram && isDesktop">
        {{ getCurrentProgram }}
      </p>
    </div>
    <div class="flex gap-4 items-center">
      <img src="/assets/images/battery.svg" width="18" height="18" />
      <img src="/assets/images/wifi.svg" width="18" height="18" />
      <p>{{ time }}</p>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useProgramStore } from "~/stores/program";
const { isDesktop } = defineProps({
  isDesktop: {
    type: Boolean,
    default: false,
  },
});
const store = useProgramStore();
const { getCurrentProgram } = storeToRefs(store);

const time = ref("");
const isOpen = reactive({
  info: false,
});
let interval: NodeJS.Timeout;

const dropdownClose = () => {
  isOpen.info = false;
};

onMounted(() => {
  dpTime();
  interval = setInterval(() => dpTime(), 1000);
});
onUnmounted(() => {
  clearInterval(interval);
});

const dpTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const days = () => {
    const day = now.getDay();
    if (day === 0) {
      return "(일)";
    }
    if (day === 1) {
      return "(월)";
    }
    if (day === 2) {
      return "(화)";
    }
    if (day === 3) {
      return "(수)";
    }
    if (day === 4) {
      return "(목)";
    }
    if (day === 5) {
      return "(금)";
    }
    if (day === 6) {
      return "(토)";
    }
  };
  time.value =
    String(now.getMonth()) + "월 " + String(now.getDate()) + "일 " + days();
  if (hours > 12) {
    time.value +=
      " 오후 " +
      String(hours - 12).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0");
  } else {
    time.value +=
      " 오전 " +
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0");
  }
};
</script>
