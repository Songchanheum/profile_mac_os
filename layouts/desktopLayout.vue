import macHeader from '~/components/macHeader.vue'; import component from
'../.nuxt/types/vue-shim'; import { MacHeader } from '../.nuxt/components';
<template>
  <div
    class="bg-[url('/assets/images/dark-bg.png')] w-[100wv] h-[100vh] bg-cover"
  >
    <MacHeader :isDesktop="true" />
    <slot />
    <div
      class="flex items-center gap-4 justify-center w-fit px-2 h-14 bg-white bg-opacity-10 border-gray-400 border-[1px] rounded-xl absolute bottom-1 left-[50%] -translate-x-[50%]"
    >
      <MacIcon name="Finder" img="finder.png" />
      <MacIcon name="Launchpad" img="launchpad.png" />
      <MacIcon name="Chrome" img="chrome.svg" />
      <MacIcon name="Visual Studio Code" img="vscode.png" />
      <MacIcon name="Songs blog" img="launchpad.png" />
      <MacIcon name="Github" img="launchpad.png" />
      <MacIcon name="message" img="message.png" />
      <MacIcon name="note" img="note.svg" />
    </div>
  </div>
</template>
