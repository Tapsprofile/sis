<template>
    <div class="form-group mb-3">
      <label>{{ label }}</label>
      <select class="form-control" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dropdown',
    props: {
      label: String,
      options: Array,
      modelValue: String
    },
    emits: ['update:modelValue']
  };
  </script>
  
  <style scoped>
  /* Custom styling if needed */
  </style>
  