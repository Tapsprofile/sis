<template>
  <div class="container-fluid mt-5">
    <DynaComponent />
  </div>
</template>

<script>
import DynaComponent from './components/DynaComponent.vue';

export default {
  name: 'App',
  components: {
    DynaComponent
  }
};
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
}
</style>
