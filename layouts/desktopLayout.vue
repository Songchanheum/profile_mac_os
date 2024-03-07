import macHeader from '~/components/macHeader.vue'; import component from
'../.nuxt/types/vue-shim'; import { MacHeader } from '../.nuxt/components';
<template>
  <div
    class="bg-[url('/assets/images/dark-bg.png')] w-[100wv] h-[100vh] bg-cover"
  >
    <MacHeader :isDesktop="true" />
    <slot />
    <div
      class="flex items-center gap-2 justify-center w-[70%] h-14 bg-white bg-opacity-25 opacity-40 border-white border-[1px] rounded-xl absolute bottom-1 left-[50%] -translate-x-[50%]"
    >
      <div>파인더</div>
      <div>런처박스</div>
    </div>
  </div>
</template>
