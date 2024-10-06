<template>
    <div v-if="component">
      <h5>Selected Component: {{ component.label }}</h5>
      <ComponentMaker :component="component" v-model="model" />
    </div>
    <div v-else>
      <p>Please select a component from the menu.</p>
    </div>
  </template>
  
  <script>
  import ComponentMaker from './ComponentMaker.vue';
  
  export default {
    name: 'ComponentRenderer',
    props: {
      component: {
        type: Object,
        required: false
      },
      model: {
        type: Object,
        required: true
      }
    },
    components: {
      ComponentMaker
    }
  };
  </script>
  
  <style scoped>
  /* Custom styling if needed */
  </style>
  