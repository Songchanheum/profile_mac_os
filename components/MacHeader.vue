<template>
  <header
    class="w-full bg-white h-10 bg-opacity-10 text-xs flex justify-between px-6 items-center text-white"
  >
    <div>
      <div v-if="isDesktop">
        <img src="/assets/images/apple.svg" width="18" height="18" />
      </div>
    </div>
    <div class="flex gap-4 items-center">
      <img src="/assets/images/battery.svg" width="18" height="18" />
      <img src="/assets/images/wifi.svg" width="18" height="18" />
      <p>{{ time }}</p>
    </div>
  </header>
</template>
¬
<script lang="ts">
export default {
  props: {
    isDesktop: {
      type: Boolean,
      default: false,
    },
  },
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
