<template>
  <div
    class="bg-[url('/assets/images/light-bg.png')] w-[100wv] h-[100vh] bg-cover"
  >
    <header
      class="w-full bg-white h-6 bg-opacity-10 text-xs flex justify-end px-6 items-center text-white"
    >
      {{ time }}
    </header>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      time: "",
    };
  },
  mounted() {
    setInterval(() => this.dpTime(), 1000);
  },
  methods: {
    dpTime() {
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
      this.time =
        String(now.getMonth()) + "월 " + String(now.getDate()) + "일 " + days();
      if (hours > 12) {
        this.time +=
          " 오후 " +
          String(hours - 12).padStart(2, "0") +
          ":" +
          String(minutes).padStart(2, "0");
      } else {
        this.time +=
          " 오전 " +
          String(hours).padStart(2, "0") +
          ":" +
          String(minutes).padStart(2, "0");
      }
    },
  },
};
</script>
