<template>
    <v-card @click="selectColumn" :style="{ backgroundColor: column.styles?.backgroundColor || '#ffffff' }">
      <v-card-title>Column ({{ column.width }}%)</v-card-title>
      <v-container>
        <v-row>
          <!-- Loop through and render components inside the column -->
          <v-col v-for="component in column.components" :key="component.id">
            <v-card class="mb-2" @click.stop="selectComponent(component)">
              <v-card-title>{{ component.label }}</v-card-title>
              <!-- Render the component using a dynamic component renderer -->
              <component-renderer :component="component" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script>
  import ComponentRenderer from './ComponentRenderer.vue';
  
  export default {
    props: {
      column: {
        type: Object,
        required: true,
      },
      preview: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      ComponentRenderer,
    },
    methods: {
      selectColumn() {
        // Emit the selected column to the parent (likely the row or layout)
        this.$emit('selectColumn', this.column);
      },
      selectComponent(component) {
        // Emit the selected component to the parent (likely the row or layout)
        this.$emit('selectComponent', component);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any relevant styles for the column layout */
  </style>
  