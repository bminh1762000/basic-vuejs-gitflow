<template>
  <form class="bg-white shadow-xl rounded-2xl mt-9">
    <template v-if="formStep">
      <div v-if="formStep === 1">
        <div class="form-control">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" class="block" />
        </div>
        <div class="form-control">
          <label for="email">Your Email</label>
          <input type="email" id="email" class="block" />
        </div>
      </div>
      <div v-else-if="formStep === 2">
        <div class="form-control">
          <label for="nameCompany">Your Company Name</label>
          <input type="text" id="nameCompany" class="block" />
        </div>
        <div class="form-control">
          <label for="employee">Number of Employees</label>
          <input type="text" id="employee" class="block" />
        </div>
      </div>
      <div v-else>
        <div class="form-control">
          <label for="addr">From where did you hear about you</label>
          <select id="addr">
            <option v-for="(add, index) in options" :value="add" :key="index">
              {{ add }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <input type="checkbox" id="checkbox" />
          <span>I accept term & conditions </span>
        </div>
      </div>
    </template>
  </form>
</template>

<script>
export default {
  name: "FormStep",
  props: {
    formStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      options: ["Friend", "Social"],
    };
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
</style>
