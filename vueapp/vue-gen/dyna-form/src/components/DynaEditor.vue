<template>
  <v-container fluid>
    <v-row>
      <!-- Layout Components Panel -->
      <v-col cols="2" class="sidebar">
        <layout-components-panel
          :tools="tools"
          @add-layout="addLayout"
          @add-row="addRow"
          @add-column="addColumn"
          @add-component="addComponent"
        />
      </v-col>

      <!-- Form Builder Panel -->
      <v-col cols="7" class="preview-area">
        <form-builder-panel
          :page="page"
          @select-layout="selectLayout"
          @select-row="selectRow"
          @select-column="selectColumn"
          @select-component="selectComponent"
          @remove-layout="removeLayout"
          @remove-row="removeRow"
          @remove-column="removeColumn"
          @remove-component="removeComponent"
        />
      </v-col>

      <!-- Properties Panel -->
      <v-col cols="3" class="sidebar">
        <properties-panel
          :selected-layout="selectedLayout"
          :selected-row="selectedRow"
          :selected-column="selectedColumn"
          :selected-component="selectedComponent"
          @update-layout="handleLayoutUpdate"
          @update-row="handleRowUpdate"
          @update-column="handleColumnUpdate"
          @update-component="handleComponentUpdate"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LayoutComponentsPanel from './LayoutComponentsPanel.vue';
import FormBuilderPanel from './FormBuilderPanel.vue';
import PropertiesPanel from './PropertiesPanel.vue';

export default {
  components: {
    LayoutComponentsPanel,
    FormBuilderPanel,
    PropertiesPanel,
  },
  data() {
    return {
      tools: [
        { type: 'infoBox', label: 'Info Box', id: 1, title: 'Sales', value: '$10,000' },
        { type: 'chart', label: 'Chart', id: 2, title: 'Chart', chartType: 'bar' },
      ],
      page: {
        type: 'page',
        title: 'Dashboard',
        path: '/dashboard',
        layouts: [],
      },
      selectedLayoutId: null,
      selectedRowId: null,
      selectedColumnId: null,
      selectedComponentId: null,
    };
  },
  computed: {
    selectedLayout() {
      return this.page.layouts.find(layout => layout.id === this.selectedLayoutId);
    },
    selectedRow() {
      if (this.selectedLayout) {
        return this.selectedLayout.rows.find(row => row.id === this.selectedRowId);
      }
      return null;
    },
    selectedColumn() {
      if (this.selectedRow) {
        return this.selectedRow.columns.find(column => column.id === this.selectedColumnId);
      }
      return null;
    },
    selectedComponent() {
      if (this.selectedColumn) {
        return this.selectedColumn.components.find(component => component.id === this.selectedComponentId);
      }
      return null;
    },
  },
  methods: {
    // Handle the event when the "Add Layout" button is clicked
    addLayout() {
      const newLayout = {
        id: Date.now(),
        name: 'New Layout',
        rows: [],
      };
      this.page.layouts.push(newLayout);
      this.selectedLayoutId = newLayout.id; // Auto-select the new layout
    },

    // Handle the event when the "Add Row" button is clicked
    addRow() {
      const layout = this.page.layouts.find(layout => layout.id === this.selectedLayoutId);
      if (layout) {
        const newRow = {
          id: Date.now(),
          columns: [],
        };
        layout.rows.push(newRow);
        this.selectedRowId = newRow.id; // Auto-select the new row
      } else {
        alert('Please select a layout first.');
      }
    },

    // Handle the event when the "Add Column" button is clicked
    addColumn() {
      const selectedRow = this.selectedRow;
      if (selectedRow) {
        const newColumn = {
          id: Date.now(),
          width: 6, // Default column width
          components: [], // Initialize with an empty array of components
          styles: {}, // Initialize an empty styles object
        };
        selectedRow.columns.push(newColumn);
        this.selectedColumnId = newColumn.id; // Auto-select the new column
      } else {
        alert('No row selected, please select a row first.');
      }
    },

    // Handle the event when a new component is added
    addComponent(tool) {
      const selectedColumn = this.selectedColumn;
      if (selectedColumn) {
        const newComponent = { ...tool, id: Date.now() };
        selectedColumn.components.push(newComponent);
        this.selectedComponentId = newComponent.id; // Auto-select the new component
      } else {
        alert('Please select a column first.');
      }
    },

    // Selection handling for layouts, rows, columns, and components
    selectLayout(layout) {
      this.selectedLayoutId = layout.id;
      this.selectedRowId = null; // Reset selected row
      this.selectedColumnId = null; // Reset selected column
      this.selectedComponentId = null; // Reset selected component
    },
    selectRow(row) {
      this.selectedRowId = row.id;
      this.selectedColumnId = null; // Reset selected column
      this.selectedComponentId = null; // Reset selected component
    },
    selectColumn(column) {
      this.selectedColumnId = column.id;
      this.selectedComponentId = null; // Reset selected component
    },
    selectComponent(component) {
      this.selectedComponentId = component.id;
    },

    // Methods to handle removing layouts, rows, columns, or components
    removeLayout(layout) {
      const index = this.page.layouts.indexOf(layout);
      if (index > -1) {
        this.page.layouts.splice(index, 1);
      }
    },
    removeRow({ layout, row }) {
      const rowIndex = layout.rows.indexOf(row);
      if (rowIndex > -1) {
        layout.rows.splice(rowIndex, 1);
      }
    },
    removeColumn({ row, column }) {
      const columnIndex = row.columns.indexOf(column);
      if (columnIndex > -1) {
        row.columns.splice(columnIndex, 1);
      }
    },
    removeComponent({ column, component }) {
      const componentIndex = column.components.indexOf(component);
      if (componentIndex > -1) {
        column.components.splice(componentIndex, 1);
      }
    },
    
    // Handlers to update layout, row, column, and component properties
    handleLayoutUpdate({ key, value }) {
      if (this.selectedLayout) {
        this.$set(this.selectedLayout, key, value); // Ensure reactivity
      }
    },
    handleRowUpdate({ key, value }) {
      if (this.selectedRow) {
        this.$set(this.selectedRow, key, value); // Ensure reactivity
      }
    },
    handleColumnUpdate({ key, value }) {
      if (this.selectedColumn) {
        this.$set(this.selectedColumn, key, value); // Ensure reactivity
      }
    },
    handleComponentUpdate({ key, value }) {
      if (this.selectedComponent) {
        this.$set(this.selectedComponent, key, value); // Ensure reactivity
      }
    },
  },
};
</script>
