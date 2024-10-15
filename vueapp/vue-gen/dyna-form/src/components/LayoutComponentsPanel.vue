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
    addLayout() {
      this.$emit('add-layout'); // Emit an event to the parent component to add a layout
    },
    addRow() {
      this.$emit('add-row'); // Emit an event to the parent component to add a row to the current layout
    },
    addColumn() {
      this.$emit('add-column'); // Emit an event to the parent component to add a column to the current row
    },
    addComponent(tool) {
      this.$emit('add-component', tool); // Emit an event to the parent component to add a component to the current column
    },
  },
};
</script>

<style scoped>
.v-list-item-content {
  cursor: pointer;
}
</style>
