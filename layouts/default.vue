<template>
  <div
    class="w-[100wv] h-[100vh] bg-cover"
    :style="{ 'background-image': 'url(' + url + ')' }"
  >
    <MacHeader :isDesktop="false" />
    <slot />
  </div>
</template>
<script lang="ts" setup>
import MacHeader from "~/components/MacHeader.vue";

const url = ref("");

onMounted(() => {
  setUrl();
  setInterval(() => setUrl(), 1000);
});

const setUrl = () => {
  const now = new Date().getHours();
  if (now > 18 || now < 6) {
    url.value = "/dark-bg.png";
  } else {
    url.value = "/light-bg.png";
  }
};
</script>
