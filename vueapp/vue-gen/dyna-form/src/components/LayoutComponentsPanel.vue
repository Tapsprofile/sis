<template>
  <v-card>
    <v-card-title>Layout Components</v-card-title>
    <v-list>
      <!-- Add Layout -->
      <v-list-item @click="addLayout">
        <v-list-item-content>Add Layout</v-list-item-content>
      </v-list-item>

      <!-- Add Row -->
      <v-list-item @click="addRow">
        <v-list-item-content>Add Row</v-list-item-content>
      </v-list-item>

      <!-- Add Column -->
      <v-list-item @click="addColumn">
        <v-list-item-content>Add Column</v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Form Elements -->
      <v-card-title>Form Elements</v-card-title>
      <v-list-item v-for="tool in tools" :key="tool.id" @click="addComponent(tool)">
        <v-list-item-content>{{ tool.label }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    tools: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Emit event to add a layout
    addLayout() {
      this.$emit('add-layout');
    },
    // Emit event to add a row to the selected layout
    addRow() {
      this.$emit('add-row');
    },
    // Emit event to add a column to the selected row
    addColumn() {
      this.$emit('add-column');
    },
    // Emit event to add a component to the selected column
    addComponent(tool) {
      this.$emit('add-component', tool);
    },
  },
};
</script>

<style scoped>
.v-list-item-content {
  cursor: pointer;
}
</style>
