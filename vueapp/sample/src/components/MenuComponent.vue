<template>
    <div class="card">
      <div class="card-header">
        <h5>Select a Component</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li
          v-for="item in menuItems"
          :key="item.type"
          class="list-group-item"
          @click="selectItem(item.type)"
          style="cursor: pointer;"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuComponent',
    props: {
      menuItems: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectItem(type) {
        this.$emit('item-selected', type);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  