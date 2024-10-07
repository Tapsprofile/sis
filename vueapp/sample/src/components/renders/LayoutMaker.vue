<template>
  <div class="row">
    <div v-for="component in layout.components" :key="component.componentId" class="col-md-6">
      <ComponentMaker :component="component" :model="formModel" @update:model="updateModel" />
    </div>
  </div>
</template>

<script>
import ComponentMaker from './ComponentMaker.vue';

export default {
  name: 'LayoutMaker',
  props: {
    layout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formModel: {} // Store form data here
    };
  },
  components: {
    ComponentMaker
  },
  methods: {
    updateModel({ key, value }) {
      // Update the form model with the new value
      this.$set(this.formModel, key, value);
    }
  }
};
</script>

<style scoped>
/* Custom styling if needed */
</style>