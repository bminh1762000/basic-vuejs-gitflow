<template>
  <div class="w-full h-4 mb-4 rounded-3xl">
    <div
      class="h-full bg-blue-500 rounded-3xl step-bar"
      :style="backgroundSteps"
    ></div>
  </div>
</template>

<script>
export default {
  name: "StepBar",
  props: {
    step: {
      type: Number,
      required: true,
    },
    totalStep: {
      type: Number,
      required: true,
    },
  },
  computed: {
    backgroundSteps() {
      const width = Math.floor((this.step * 100) / this.totalStep);
      return { width: width + "%" };
    },
  },
};
</script>

<style scoped>
.step-bar {
  transition: 0.6s;
}
</style>
