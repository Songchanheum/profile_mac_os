<template>
  <div
    class="w-[100wv] h-[100vh] relative overflow-hidden"
    @click="setToggleTrue"
  >
    <main class="mx-auto pt-52 w-fit">
      <section class="flex flex-col w-[350px] justify-center items-center">
        <div class="w-[150px] h-[150px]">
          <img
            src="/program/profile.png"
            class="rounded-full bg-slate-400"
            rel="preload"
          />
        </div>
        <h1 class="text-white text-xl shadow-black drop-shadow mt-7">
          Song Chanheum
        </h1>
        <div v-if="!pwToggle" class="mt-14">
          <p class="text-sm text-white drop-shadow shadow-black">
            Click Anywhere or Insert Password
          </p>
        </div>
        <div
          v-if="pwToggle"
          class="mt-4 flex flex-col gap-3 items-center relative"
        >
          <input
            class="bg-white bg-opacity-30 rounded-full p-1 px-4 text-sm w-[165px] text-white placeholder-gray-300 shadow-black/30 shadow-lg focus-visible:outline-none"
            placeholder="암호 입력"
            type="password"
            @input="inputPw"
            v-model="passwd"
            @keyup.enter="$router.push({ path: '/desktop' })"
          />
          <NuxtLink to="/desktop">
            <button
              class="absolute top-1 right-2 rounded-full border-white border-2 opacity-60"
              v-if="passwd.length > 0"
            >
              <img
                src="/assets/images/arrow-right.svg"
                width="16px"
                height="16px"
                rel="preload"
              /></button
          ></NuxtLink>
          <p class="text-sm text-gray-200 drop-shadow-2xl shadow-black">
            Insert Any Password
          </p>
        </div>
      </section>
    </main>
    <button
      class="w-[40px] h-[40px] absolute bottom-24 left-[50%] -translate-x-[50%] bg-gray-600 bg-opacity-20 rounded-full"
      @click.stop="setToggleFalse"
      v-if="pwToggle"
    >
      <p
        class="w-[28px] h-[28px] rounded-full border-white border-2 text-white mx-auto text-center"
      >
        X
      </p>
    </button>
  </div>
</template>
<script lang="ts" setup>
/// <reference types='google.accounts' />
const pwToggle = ref(false);
const passwd = ref("");

const setToggleTrue = () => {
  pwToggle.value = true;
};
const setToggleFalse = () => {
  pwToggle.value = false;
};
const inputPw = (e: Event) => {
  passwd.value = (e.target as HTMLInputElement).value;
};
</script>
