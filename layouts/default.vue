import macHeader from '~/components/macHeader.vue'; import component from
'../.nuxt/types/vue-shim'; import { MacHeader } from '../.nuxt/components';
<template>
  <div
    class="bg-[url('/assets/images/light-bg.png')] w-[100wv] h-[100vh] bg-cover"
  >
    <MacHeader :isDesktop="false" />
    <slot />
  </div>
</template>
