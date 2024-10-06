<template>
    <div class="form-group mb-3">
      <label>{{ label }}</label>
      <input type="date" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'DateField',
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
  