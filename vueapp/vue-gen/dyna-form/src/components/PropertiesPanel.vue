<template>
    <v-card>
      <v-card-title>Properties</v-card-title>
  
      <!-- Layout Properties -->
      <v-card-text v-if="selectedLayout">
        <h3>Layout Settings</h3>
        <v-text-field label="Layout Name" :value="selectedLayout.name" @input="updateLayout('name', $event.target.value)" />
      </v-card-text>
  
      <!-- Row Properties -->
      <v-card-text v-else-if="selectedRow">
        <h3>Row Settings</h3>
        <v-text-field label="Row Height" :value="selectedRow.height" @input="updateRow('height', $event.target.value)" />
        <v-text-field label="Row Background Color" :value="selectedRow.styles?.backgroundColor || '#ffffff'" @input="updateRowStyle('backgroundColor', $event.target.value)" />
        <v-text-field label="Row Padding" :value="selectedRow.styles?.padding || '0px'" @input="updateRowStyle('padding', $event.target.value)" />
      </v-card-text>
  
      <!-- Column Properties -->
      <v-card-text v-else-if="selectedColumn">
        <h3>Column Settings</h3>
        <v-text-field label="Column Width" :value="selectedColumn.width" @input="updateColumn('width', $event.target.value)" />
        <v-text-field label="Column Background Color" :value="selectedColumn.styles?.backgroundColor || '#ffffff'" @input="updateColumnStyle('backgroundColor', $event.target.value)" />
      </v-card-text>
  
      <!-- Component Properties -->
      <v-card-text v-else-if="selectedComponent">
        <h3>Component Settings</h3>
        <v-text-field label="Component Background Color" :value="selectedComponent.styles?.backgroundColor || '#ffffff'" @input="updateComponentStyle('backgroundColor', $event.target.value)" />
      </v-card-text>
  
      <!-- Default message -->
      <v-card-text v-else>
        <p>Select a layout, row, column, or component to edit its properties</p>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      selectedLayout: Object,
      selectedRow: Object,
      selectedColumn: Object,
      selectedComponent: Object,
    },
    methods: {
      updateLayout(key, value) {
        this.$emit('update-layout', { key, value });
      },
      updateRow(key, value) {
        this.$emit('update-row', { key, value });
      },
      updateRowStyle(styleKey, value) {
        this.$emit('update-row-style', { styleKey, value });
      },
      updateColumn(key, value) {
        this.$emit('update-column', { key, value });
      },
      updateColumnStyle(styleKey, value) {
        this.$emit('update-column-style', { styleKey, value });
      },
      updateComponentStyle(styleKey, value) {
        this.$emit('update-component-style', { styleKey, value });
      },
    },
  };
  </script>
  