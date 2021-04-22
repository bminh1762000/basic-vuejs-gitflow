<template>
  <div>
    <form class="bg-white shadow-xl rounded-2xl mt-9">
      <template v-if="formStep">
        <div v-if="formStep === 1">
          <div class="form-control">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              class="block"
              :class="{ error: !isFullNameValid }"
              v-model="fullName"
            />
            <p v-if="!isFullNameValid" class="text-red-500">Please provide full name</p>
          </div>
          <div class="form-control">
            <label for="email">Your Email</label>
            <input
              type="email"
              id="email"
              class="block"
              :class="{ error: !isEmailValid }"
              v-model="email"
            />
            <p v-if="!isEmailValid" class="text-red-500">Please provide your email</p>
          </div>
        </div>
        <div v-else-if="formStep === 2">
          <div class="form-control">
            <label for="nameCompany">Your Company Name</label>
            <input
              type="text"
              id="nameCompany"
              class="block"
              :class="{ error: !isCompanyNameValid }"
              v-model="companyName"
            />
            <p v-if="!isCompanyNameValid" class="text-red-500">Please provide you company name</p>
          </div>
          <div class="form-control">
            <label for="employee">Number of Employees</label>
            <input
              type="text"
              id="employee"
              class="block"
              :class="{ error: !isNumberEmployeeValid }"
              v-model.number="numberOfEmployees"
            />
            <p v-if="!isNumberEmployeeValid" class="text-red-500">Enter valid value</p>
          </div>
        </div>
        <div v-else>
          <div class="form-control">
            <label for="addr">From where did you hear about you</label>
            <select id="addr" v-model="referral">
              <option v-for="(add, index) in options" :value="add" :key="index">
                {{ add }}
              </option>
            </select>
          </div>
          <div class="form-control">
            <input type="checkbox" id="checkbox" v-model="terms" />
            <span>I accept term & conditions </span>
            <p v-if="!isTermsValid" class="text-red-500">Please accept our terms</p>
          </div>
        </div>
      </template>
    </form>
    <div class="mt-12" v-if="formStep < 3 && formStep >= 1">
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
  </div>
</template>

<script>
import { required, isEmail, numeric } from "../validator.js";
export default {
  name: "FormStep",
  data() {
    return {
      fullName: null,
      email: "",
      companyName: "",
      numberOfEmployees: null,
      referral: "Friend",
      terms: "",
      options: ["Friend", "Social", "Other"],
    };
  },
  props: {
    formStep: {
      type: Number,
      required: true,
    },
  },
  methods: {
    nextStep() {
      if (!this.validateCurrentStep()) {
        return;
      }
      this.$emit("next-step");
    },
    prevStep() {
      this.$emit("prev-step");
    },
    formReset() {
      this.$emit("reset-form");
    },
    validateCurrentStep() {
      if (this.formStep === 1) {
        return this.isFullNameValid && this.isEmailValid;
      } else if (this.formStep === 2) {
        return this.isCompanyNameValid && this.numberOfEmployees;
      } else {
        return this.isReferralValid && this.isTerms;
      }
    },
  },
  computed: {
    isNextDisable() {
      if (this.formStep >= 3) {
        return true;
      }
      return false;
    },
    isPrevDisable() {
      if (this.formStep <= 1) {
        return true;
      }
      return false;
    },
    isFullNameValid() {
      return required(this.fullName);
    },
    isEmailValid() {
      const isValid = required(this.email) && isEmail(this.email);
      return isValid;
    },
    isCompanyNameValid() {
      return required(this.companyName);
    },
    isNumberEmployeeValid() {
      return (
        required(this.numberOfEmployees) && numeric(this.numberOfEmployees)
      );
    },
    isReferralValid() {
      return required(this.referral);
    },
    isTermsValid() {
      return required(this.terms);
    },
  },
};
</script>

<style scoped>
form {
  text-align: left;
  padding: 2rem 1.5rem;
}

.form-control {
  margin-bottom: 0.75rem;
}

input,
select {
  width: 100%;
  padding: 0.2rem 0;
  border: 1px solid #c2bfbf;
  border-radius: 0.25rem;
}

input[type="text"],
input[type="email"],
input[type="checkbox"],
select {
  margin-top: 1rem;
}

select {
  background-color: white;
}

.error {
  border: 1px solid red;
}
</style>
