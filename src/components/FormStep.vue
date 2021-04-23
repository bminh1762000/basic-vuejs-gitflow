<template>
  <div>
    <form class="bg-white shadow-xl rounded-2xl mt-9">
      <template>
        <div v-if="formStep === 1">
          <div class="form-control">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              class="block"
              :class="{ error: $v.fullName.$error }"
              v-model.trim="$v.fullName.$model"
            />
            <div class="mt-2">
              <span
                v-if="!$v.fullName.required && $v.fullName.$error"
                class="text-red-500"
                >Full name is required</span
              >
              <span v-if="!$v.fullName.minLength" class="text-red-500"
                >Full name must have at least
                {{ $v.fullName.$params.minLength.min }} letters</span
              >
            </div>
          </div>
          <div class="form-control">
            <label for="email">Your Email</label>
            <input
              type="email"
              id="email"
              class="block"
              :class="{ error: $v.email.$error }"
              v-model.trim="$v.email.$model"
            />
            <div class="mt-2">
              <span
                v-if="!$v.email.required && $v.email.$error"
                class="text-red-500"
                >Email is required</span
              >
              <span v-if="!$v.email.email" class="text-red-500"
                >Enter valid email
              </span>
            </div>
          </div>
        </div>
        <div v-else-if="formStep === 2">
          <div class="form-control">
            <label for="nameCompany">Your Company Name</label>
            <input
              type="text"
              id="nameCompany"
              class="block"
              :class="{ error: $v.companyName.$error }"
              v-model.trim="$v.companyName.$model"
            />
            <div class="mt-2">
              <span
                v-if="!$v.companyName.required && $v.companyName.$error"
                class="text-red-500"
                >Full name is required</span
              >
              <span v-if="!$v.companyName.minLength" class="text-red-500"
                >Name of company must have at least
                {{ $v.companyName.$params.minLength.min }}</span
              >
            </div>
          </div>
          <div class="form-control">
            <label for="employee">Number of Employees</label>
            <input
              type="text"
              id="employee"
              class="block"
              :class="{ error: $v.numberOfEmployees.$error }"
              v-model.number="$v.numberOfEmployees.$model"
            />
            <div class="mt-2">
              <span
                v-if="
                  !$v.numberOfEmployees.required && $v.numberOfEmployees.$error
                "
                class="text-red-500"
                >Number of employees are required</span
              >
              <span v-if="!$v.numberOfEmployees.numeric" class="text-red-500"
                >Please enter a number</span
              >
            </div>
          </div>
        </div>
        <div v-else-if="formStep === 3">
          <div class="form-control">
            <label for="addr">From where did you hear about you</label>
            <select id="addr" v-model="$v.referral.$model">
              <option v-for="(add, index) in options" :value="add" :key="index">
                {{ add }}
              </option>
            </select>
            <div class="mt-2">
              <span
                v-if="!$v.referral.required && $v.referral.$error"
                class="text-red-500"
                >Referral is required</span
              >
            </div>
          </div>
          <div class="form-control">
            <input type="checkbox" v-model="$v.terms.$model" id="term" />
            <label class="inline-block ml-3" for="term"
              >I accept term & conditions</label
            >
            <div class="mt-2">
              <span
                v-if="!$v.terms.required && $v.terms.$error"
                class="text-red-500"
                >Term is required</span
              >
            </div>
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
    <div class="mt-10 mx-auto" v-else-if="formStep >= 3">
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
        class="px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold mr-3"
        @click="formReset"
      >
        Reset
      </button>
      <button
        type="submit"
        @click.prevent="handleSubmit"
        class="px-5 py-2 bg-green-500 rounded-lg text-white font-semibold mr-3"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, numeric } from "vuelidate/lib/validators";

export default {
  name: "FormStep",
  data() {
    return {
      fullName: "",
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
  validations: {
    fullName: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    companyName: {
      required,
      minLength: minLength(4),
    },
    numberOfEmployees: {
      required,
      numeric,
    },
    terms: {
      required,
    },
    referral: {
      required,
    },
  },
  methods: {
    nextStep() {
      if (this.validateCurrentStep()) {
        return;
      }
      this.$emit("next-step");
    },
    prevStep() {
      this.$emit("prev-step");
    },
    formReset() {
      this.$emit("reset-form");
      this.fullName = "";
      this.email = "";
      this.companyName = "";
      this.numberOfEmployees = null;
      this.referral = "Friend";
      this.terms = "";
    },
    validateCurrentStep() {
      if (this.formStep === 1) {
        return this.$v.fullName.$invalid || this.$v.email.$invalid;
      }
      if (this.formStep === 2) {
        return (
          this.$v.companyName.$invalid || this.$v.numberOfEmployees.$invalid
        );
      }
      return this.$v.terms.$invalid || this.$v.referral.$invalid;
    },
    handleSubmit() {
      if (this.$v.terms.$invalid || this.$v.referral.$invalid) {
        return;
      }
      this.formReset();
      alert("Submit form successfully.");
    },
  },
  computed: {
    isPrevDisable() {
      if (this.formStep <= 1) {
        return true;
      }
      return false;
    },
    isNextDisable() {
      if (this.formStep >= 3) {
        return true;
      }
      return false;
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

input[type="text"],
input[type="email"],
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
