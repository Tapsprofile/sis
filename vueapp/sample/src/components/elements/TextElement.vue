<template>
    <div class="form-group mb-3">
      <label>{{ label }}</label>
      <input type="text" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextField',
    props: {
      label: String,
      modelValue: String
    },
    emits: ['update:modelValue']
  };
  </script>
  
  <style scoped>
  /* Custom styling if needed */
  </style>
  