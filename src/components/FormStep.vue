<template>
  <div>
    <ValidationObserver
      ref="observer"
      v-slot="{ handleSubmit }"
      v-for="(step, index) in listStep"
      :key="index"
    >
      <form
        @submit.prevent="
          handleSubmit(step.id === totalPage ? finishProcess : nextProcess)
        "
        v-if="step.id === currentPage"
      >
        <ValidationProvider
          v-slot="{ errors, classes }"
          v-for="(content, index) in step.listField"
          :key="index"
          :name="content.name"
          :rules="content.rule"
        >
          <div
            class="form-group"
            :class="{ 'form-check': isCheckBox(content.type) }"
          >
            <label v-if="!isCheckBox(content.type)" class="text-left d-flex">
              {{
                content.type === "select"
                  ? "From where did you hear about you"
                  : content.name | capitalize
              }}
            </label>
            <input
              v-if="!isSelect(content.type)"
              :type="content.type"
              :class="{
                'form-check-input': isCheckBox(content.type),
                'form-control': !isCheckBox(content.type),
              }"
              v-model="content.model"
            />
            <label v-if="isCheckBox(content.type)" class="form-check-label">
              I accept term & conditions
            </label>
            <select
              v-if="isSelect(content.type)"
              :type="content.type"
              class="form-control"
              v-model="content.model"
            >
              <option value="Friend facebook">Facebook</option>
              <option value="Google">Friend</option>
            </select>
            <span :class="classes" class="styleSpan text-red-500">{{
              errors[0]
            }}</span>
          </div>
        </ValidationProvider>
        <div class="mx-auto mt-12 flex justify-center items-center">
          <template v-if="currentPage < totalPage">
            <button
              type="button"
              class="px-5 py-2 bg-green-500 rounded-lg text-white font-semibold mr-3"
              @click="prevProcess"
            >
              PREVIOUS
            </button>
            <button
              type="submit"
              class="px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold"
            >
              NEXT
            </button>
          </template>
          <template v-if="currentPage === totalPage">
            <button
              type="button"
              class="px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold mr-3"
              @click="resetProcess"
            >
              RESET
            </button>
            <button
              class="px-5 py-2 bg-green-500 rounded-lg text-white font-semibold mr-3"
              type="submit"
            >
              Submit
            </button>
          </template>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: "FormStep",
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        companyName: "",
        numberOfEmployees: null,
        referral: "",
        terms: false,
      },
    };
  },
  props: {
    currentPage: Number,
    prevProcess: {
      type: Function,
      default: () => {
        return [];
      },
    },
    nextProcess: {
      type: Function,
      default: () => {
        return [];
      },
    },
    resetProcess: {
      type: Function,
      default: () => {
        return [];
      },
    },
    finishProcess: {
      type: Function,
      default: () => {
        return [];
      },
    },
    totalPage: {
      type: Number,
      default: () => {
        return "";
      },
    },
    listStep: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    isCheckBox(item) {
      if (item === "checkbox") return true;
      return false;
    },
    isSelect(item) {
      if (item === "select") return true;
      return false;
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  computed: {
    isPrevDisable() {
      if (this.currentPage <= 1) {
        return true;
      }
      return false;
    },
    isNextDisable() {
      if (this.currentPage >= 3) {
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
