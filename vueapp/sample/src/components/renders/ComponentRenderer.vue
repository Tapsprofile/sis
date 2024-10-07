<template>
  <div v-if="component">
    <h5>Selected Component: {{ component.label }}</h5>
    <ComponentMaker :component="component" :model="model" @update:model="updateModel" />
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
  },
  methods: {
    updateModel(updatedValue) {
      // Merge the updated value into the existing model object
      Object.assign(this.model, updatedValue);
    }
  }
};
</script>

<style scoped>
/* Custom styling if needed */
</style>