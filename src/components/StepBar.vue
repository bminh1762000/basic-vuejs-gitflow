<template>
  <div class="w-full h-4 mb-4 rounded-3xl">
    <div class="h-full bg-blue-500 rounded-3xl step-bar" :style="backgroundSteps"></div>
  </div>
</template>

<script>
export default {
  name: "StepBar",
  props: ["step"],
  computed: {
    backgroundSteps: function() {
      if (this.step === 1) {
        return { width: 30 + "%" };
      } else if (this.step === 2) {
        return { width: 68 + "%" };
      }
      return { width: 100 + "%" };
    },
  },
};
</script>

<style scoped>
.step-bar{
  transition: 0.6s;
}
</style>
