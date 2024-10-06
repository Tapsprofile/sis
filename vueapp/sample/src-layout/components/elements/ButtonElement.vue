<template>
    <div class="form-group mt-4">
      <button type="button" class="btn btn-primary" @click="handleClick">{{ label }}</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonElement',
    props: {
      label: String,
      action: String
    },
    methods: {
      handleClick() {
        this.$emit('button-clicked', this.action);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom styling if needed */
  </style>
  