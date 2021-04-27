<template>
  <div id="app" class="w-2/5 mx-auto ">
    <step-bar :step="step" :totalStep="totalStep"></step-bar>
    <process-step></process-step>
    <form-step
      :currentPage="step"
      :next-process="nextStep"
      :totalPage="totalStep"
      :prev-process="prevStep"
      :reset-process="resetForm"
      :finish-process="finishProcess"
      :listStep="listStep"
    ></form-step>
  </div>
</template>

<script>
import ProcessStep from "./components/ProcessStep.vue";
import StepBar from "./components/StepBar.vue";
import FormStep from "./components/FormStep.vue";

export default {
  name: "App",
  components: {
    ProcessStep,
    StepBar,
    FormStep,
  },
  data() {
    return {
      step: 1,
      totalStep: 3,
      listStep: [
        {
          id: 1,
          status: true,
          listField: [
            {
              model: "",
              name: "fullName",
              type: "text",
              rule: "required",
            },
            {
              model: "",
              name: "email",
              type: "email",
              rule: "required|email",
            },
          ],
        },
        {
          id: 2,
          status: false,
          listField: [
            {
              model: "",
              name: "nameCompany",
              type: "text",
              rule: "required",
            },
            {
              model: "",
              name: "numberOfEmployees",
              type: "text",
              rule: "required|numeric",
            },
          ],
        },
        {
          id: 3,
          status: false,
          listField: [
            {
              model: "",
              name: "referral",
              type: "select",
              rule: "required",
            },
            {
              model: "",
              name: "terms",
              type: "checkbox",
              rule: "required",
            },
          ],
        },
      ],
    };
  },
  methods: {
    nextStep() {
      if (this.step === this.totalStep) {
        this.step = this.totalStep;
      }
      if (this.step < 3) {
        this.step++;
      }
      this.listStep[this.step - 1].status = true;
    },
    prevStep() {
      if (this.step === 1) {
        this.step = 1;
      }
      if (this.step > 1) {
        this.step--;
      }
      this.listStep[this.step].status = false;
    },
    resetForm() {
      this.step = 1;
      this.listStep = this.listStep.map((item) =>
        item.id !== this.step ? { ...item, status: false } : item
      );
      this.listStep.forEach((item) => {
        item.listField.forEach((i) => {
          i.model = "";
        });
      });
    },
    finishProcess() {
      alert("The form submit successfully");
      this.resetForm();
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
