<template>
  <button @click="setProgram" class="h-10 w-10 bg-white rounded-xl">
    {{ name }}
  </button>
</template>

<script lang="ts" setup>
import { useProgramStore } from "~/stores/program";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const { name } = props;

// 스토어 생성
const store = useProgramStore();

const setProgram = () => {
  store.addProgram(name);
};
</script>
