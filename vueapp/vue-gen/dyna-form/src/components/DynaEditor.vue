<template>
  <v-container fluid>
    <v-row>
      <!-- Layout Components Panel -->
      <v-col cols="2" class="sidebar">
        <layout-components-panel :tools="tools" @add-layout="addLayout" @add-row="addRow" @add-column="addColumn"
          @add-component="addComponent" />
      </v-col>

      <!-- Form Builder Panel -->
      <v-col cols="7" class="preview-area">
        <form-builder-panel :page="page" @select-layout="selectLayout" @select-row="selectRow"
          @select-column="selectColumn" @select-component="selectComponent" @remove-layout="removeLayout"
          @remove-row="removeRow" @remove-column="removeColumn" @remove-component="removeComponent" />
      </v-col>

      <!-- Properties Panel -->
      <v-col cols="3" class="sidebar">
        <properties-panel :selected-layout="selectedLayout" :selected-row="selectedRow"
          :selected-column="selectedColumn" :selected-component="selectedComponent" @update-layout="handleLayoutUpdate"
          @update-layout-style="handleLayoutStyleUpdate" @update-row="handleRowUpdate"
          @update-row-style="handleRowStyleUpdate" @update-column="handleColumnUpdate"
          @update-column-style="handleColumnStyleUpdate" @update-component="handleComponentUpdate"
          @update-component-style="handleComponentStyleUpdate" />
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
        path: '/Dashboard',
        layouts: [],
      },
      selectedLayoutId: null, // Track by ID
      selectedRowId: null, // Track by ID
      selectedColumnId: null, // Track by ID
      selectedComponentId: null, // Track by ID
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
    // Add a new layout
    addLayout() {
      const newLayout = {
        id: Date.now(),
        name: 'New Layout',
        rows: [],
      };
      this.page.layouts.push(newLayout);
      this.selectedLayoutId = newLayout.id; // Auto-select the new layout
    },

    // Add a new row to the selected layout
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

    // Add a new column to the selected row
    addColumn() {
      alert('Layout--->' + this.selectedLayoutId);
      alert('Row--->' + this.selectedRowId);
      const selectedRow = this.selectedRow; // Fetch the row based on the ID
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

    // Add a new component to the selected column
    addComponent(tool) {
      const selectedColumn = this.selectedColumn; // Fetch the column based on the ID
      if (selectedColumn) {
        const newComponent = { ...tool, id: Date.now() };
        selectedColumn.components.push(newComponent);
        this.selectedComponentId = newComponent.id; // Auto-select the new component
      } else {
        alert('Please select a column first.');
      }
    },



    selectLayout(layout) {
      this.selectedLayoutId = layout.id; // Track the selected component by ID
      this.selectedRowId = null; // Correctly set selectedRowId when clicked
      this.selectedColumnId = null; // Reset selected column
      this.selectedComponentId = null; // Reset selected component
    },

    selectRow(row) {
      console.log('Selected Row:', row.id);
      this.selectedRowId = row.id; // Correctly set selectedRowId when clicked
      this.selectedColumnId = null; // Reset selected column
      this.selectedComponentId = null; // Reset selected component
    },
    selectColumn(column) {
      this.selectedColumnId = column.id; // Track the selected column by ID
      this.selectedComponentId = null; // Reset selected component
    },

    selectComponent(component) {
      this.selectedComponentId = component.id; // Track the selected component by ID
    },

    // Handle removing a layout
    removeLayout(layout) {
      const index = this.page.layouts.indexOf(layout);
      if (index > -1) {
        this.page.layouts.splice(index, 1);
      }
    },

    // Handle removing a row
    removeRow({ layout, row }) {
      const rowIndex = layout.rows.indexOf(row);
      if (rowIndex > -1) {
        layout.rows.splice(rowIndex, 1);
      }
    },

    // Handle removing a column
    removeColumn({ row, column }) {
      const columnIndex = row.columns.indexOf(column);
      if (columnIndex > -1) {
        row.columns.splice(columnIndex, 1);
      }
    },

    // Handle removing a component
    removeComponent({ column, component }) {
      const componentIndex = column.components.indexOf(component);
      if (componentIndex > -1) {
        column.components.splice(componentIndex, 1);
      }
    },

    // Handlers to update layout, row, column, and component properties
    handleLayoutUpdate({ key, value }) {
      alert('Layout Clicked');
      if (this.selectedLayout) {
        this.selectedLayout[key] = value;
      }
    },
    handleLayoutStyleUpdate({ styleKey, value }) {
      if (this.selectedLayout && this.selectedLayout.styles) {
        this.selectedLayout.styles[styleKey] = value;
      }
    },
    handleRowUpdate({ key, value }) {
      if (this.selectedRow) {
        this.selectedRow[key] = value;
      }
    },
    handleRowStyleUpdate({ styleKey, value }) {
      if (this.selectedRow && this.selectedRow.styles) {
        this.selectedRow.styles[styleKey] = value;
      }
    },
    handleColumnUpdate({ key, value }) {
      if (this.selectedColumn) {
        this.selectedColumn[key] = value;
      }
    },
    handleColumnStyleUpdate({ styleKey, value }) {
      if (this.selectedColumn && this.selectedColumn.styles) {
        this.selectedColumn.styles[styleKey] = value;
      }
    },
    handleComponentUpdate({ key, value }) {
      alert('Handle COmponent Updated');
      if (this.selectedComponent) {
        this.selectedComponent[key] = value;
      }
    },
    handleComponentStyleUpdate({ styleKey, value }) {
      if (this.selectedComponent && this.selectedComponent.styles) {
        this.selectedComponent.styles[styleKey] = value;
      }
    },
  },
};
</script>
