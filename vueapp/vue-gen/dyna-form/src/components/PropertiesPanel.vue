<template>
  <v-card>
    <v-card-title>Properties</v-card-title>

    <!-- Layout Properties -->
    <v-card-text v-if="selectedLayout">
      <h3>Layout Settings</h3>
      <label>
        Name:
        <input :value="selectedLayout.name" @input="updateLayout('name', $event.target.value)" />
      </label>
      <label>
        Background Color:
        <input :value="selectedLayout.styles?.backgroundColor || '#ffffff'" @input="updateLayoutStyle('backgroundColor', $event.target.value)" />
      </label>
    </v-card-text>

    <!-- Row Properties -->
    <v-card-text v-else-if="selectedRow">
      <h3>Row Settings</h3>
      <label>
        Row Height:
        <input :value="selectedRow.height || ''" @input="updateRow('height', $event.target.value)" />
      </label>
      <label>
        Background Color:
        <input :value="selectedRow.styles?.backgroundColor || '#ffffff'" @input="updateRowStyle('backgroundColor', $event.target.value)" />
      </label>
    </v-card-text>

    <!-- Column Properties -->
    <v-card-text v-else-if="selectedColumn">
      <h3>Column Settings</h3>
      <label>
        Column Width:
        <input :value="selectedColumn.width" @input="updateColumn('width', $event.target.value)" />
      </label>
      <label>
        Background Color:
        <input :value="selectedColumn.styles?.backgroundColor || '#ffffff'" @input="updateColumnStyle('backgroundColor', $event.target.value)" />
      </label>
    </v-card-text>

    <!-- Component Properties -->
    <v-card-text v-else-if="selectedComponent">
      <h3>Component Settings</h3>
      <label>
        Label:
        <input :value="selectedComponent.label" @input="updateComponent('label', $event.target.value)" />
      </label>
      <label>
        Background Color:
        <input :value="selectedComponent.styles?.backgroundColor || '#ffffff'" @input="updateComponentStyle('backgroundColor', $event.target.value)" />
      </label>
    </v-card-text>

    <!-- Default message when nothing is selected -->
    <v-card-text v-else>
      <p>Select a layout, row, column, or component to edit its properties.</p>
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
    // Emit events to update properties for the selected layout, row, column, or component
    updateLayout(key, value) {
      this.$emit('update-layout', { key, value });
    },
    updateLayoutStyle(styleKey, value) {
      this.$emit('update-layout-style', { styleKey, value });
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
    updateComponent(key, value) {
      this.$emit('update-component', { key, value });
    },
    updateComponentStyle(styleKey, value) {
      this.$emit('update-component-style', { styleKey, value });
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 5px;
}
</style>
