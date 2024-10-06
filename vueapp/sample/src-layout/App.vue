<template>
  <div class="container-fluid mt-5">
    <h4 class="mb-4">Dynamic Page Renderer</h4>
    <div v-for="layout in pageLayouts" :key="layout.layoutId" class="row mb-4">
      <LayoutMaker :layout="layout" />
    </div>
  </div>
</template>

<script>
import LayoutMaker from './components/LayoutMaker.vue';

export default {
  name: 'App',
  data() {
    return {
      pageLayouts: [
        {
          layoutId: 'layout1',
          components: [
            {
              componentId: 'component1',
              elements: [
                { type: 'text', label: 'First Name', model: 'firstName' },
                { type: 'text', label: 'Last Name', model: 'lastName' },
                { type: 'date', label: 'Date of Birth', model: 'dob' }
              ]
            },
            {
              componentId: 'component2',
              elements: [
                {
                  type: 'dropdown',
                  label: 'Country',
                  model: 'country',
                  options: ['USA', 'Canada', 'Australia']
                },
                { type: 'button', label: 'Submit', action: 'submitForm' }
              ]
            },
            {
              componentId: 'component3',
              elements: [
                {
                  type: 'dropdown',
                  label: 'Country',
                  model: 'country',
                  options: ['USA', 'Canada', 'Australia']
                },
                { type: 'button', label: 'Submit', action: 'submitForm' }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    LayoutMaker
  }
};
</script>

<style scoped>
.container-fluid {
  max-width: 900px;
}
</style>
