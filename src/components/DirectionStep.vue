<template>
  <div class="mt-12" v-if="stepForm < 3 && stepForm >= 1">
    <button
      type="button"
      class="px-5 py-2 bg-green-500 rounded-lg text-white font-semibold mr-3"
      @click="prevStep"
      :disabled="isPrevDisable"
    >
      Previous
    </button>
    <button
      type="button"
      class="px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold"
      @click="nextStep"
      :disabled="isNextDisable"
    >
      Next
    </button>
  </div>
  <div class="mt-10" v-else>
    <button
      type="button"
      class="px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold"
      @click="formReset"
    >
      Reset
    </button>
  </div>
</template>

<script>
export default {
  name: "DirectionStep",
  props: {
    stepForm: {
      type: Number,
      required: true,
    },
  },
  methods: {
    nextStep() {
      this.$emit("next-step");
    },
    prevStep() {
      this.$emit("prev-step");
    },
    formReset() {
      this.$emit("reset-form");
    },
  },
  computed: {
    isNextDisable() {
      if (this.stepForm >= 3) {
        return true;
      }
      return false;
    },
    isPrevDisable() {
      if (this.stepForm <= 1) {
        return true;
      }
      return false;
    },
  },
};
</script>
