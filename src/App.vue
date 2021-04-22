<template>
  <div id="app" class="w-2/5 mx-auto ">
    <step-bar :step="step"></step-bar>
    <step-form></step-form>
    <form-step
      :formStep="step"
      @next-step="nextStep"
      @prev-step="prevStep"
      @reset-form="resetForm"
    ></form-step>
  </div>
</template>

<script>
import StepForm from "./components/StepForm.vue";
import StepBar from "./components/StepBar.vue";
import FormStep from "./components/FormStep.vue";

export default {
  name: "App",
  components: {
    StepForm,
    StepBar,
    FormStep,
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    nextStep() {
      this.step = this.step + 1;
    },
    prevStep() {
      this.step = this.step - 1;
    },
    resetForm() {
      this.step = 1;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
