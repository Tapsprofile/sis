<template>
  <v-card>
    <v-card-title>Form Builder</v-card-title>

    <!-- Tabs to toggle between Design, Preview, and JSON -->
    <v-tabs v-model="activeTab">
      <v-tab>Design</v-tab>
      <v-tab>Preview</v-tab>
      <v-tab>JSON</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <!-- Design View: Allows editing and adding elements -->
      <v-tab-item>
        <v-container v-if="activeTab === 0">
          <!-- Loop through layouts, rows, columns, and components -->
          <v-row v-for="layout in page.layouts" :key="layout.id">
            <v-col>
              <v-card @click="selectLayout(layout)"> <!-- Layout Click Event -->
                <v-card-title>Layout <v-icon @click.stop="removeLayout(layout)" class="ml-auto"
                    color="red">mdi-minus-circle-outline</v-icon></v-card-title>
                <v-container>
                  <v-row v-for="row in layout.rows" :key="row.id">
                    <v-col>
                      <v-card class="no-border-card" @click="selectRow(row)" :class="{ 'selected-row': row.id === selectedRowId }">
                        <!-- Row Click Event -->
                        <v-card-title> Row <v-icon Row @click.stop="removeRow(layout, row)" class="ml-minus"> - </v-icon></v-card-title>
                        <v-container>
                          <v-row>
                            <v-col v-for="column in row.columns" :key="column.id" :cols="column.width" class="pa-2"
                              :style="column.styles">
                              <!-- Move the @click.stop here, at the v-card level for the column -->
                              <v-card @click.stop="selectColumn(column)"> <!-- Column Click Event -->
                                <v-card-title>Column ({{ column.width }}%)
                                  <v-btn @click.stop="removeColumn(row, column)">
                                    <span class="material-icons">remove_circle_outline</span>
                                  </v-btn>
                                </v-card-title>
                                <v-container>
                                  <v-row>
                                    <v-col v-for="component in column.components" :key="component.id">
                                      <v-card class="mb-2" :style="component.styles"
                                        @click.stop="selectComponent(component)">
                                        <v-card-title>{{ component.label }}<v-icon
                                            @click.stop="removeComponent(column, component)" class="ml-auto"
                                            color="red">mdi-minus-circle-outline</v-icon></v-card-title>
                                        <component-renderer :component="component"
                                          @update:model="updateComponentModel(component, $event)" />
                                      </v-card>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <!-- Preview View: No editing, just displays the structure -->
      <v-tab-item>
        <v-container v-if="activeTab === 1">
          <!-- Loop through layouts for preview -->
          <v-row v-for="layout in page.layouts" :key="layout.id">
            <v-col>
              <v-card class="no-border-card mb-6">
                <v-container>
                  <v-row v-for="row in layout.rows" :key="row.id">
                    <v-col>
                      <v-card class="no-border-card mb-2">
                        <v-container>
                          <v-row>
                            <v-col v-for="column in row.columns" :key="column.id" :cols="column.width" class="pa-2"
                              :style="column.styles">
                              <v-card class="no-border-card mb-2">
                                <v-container>
                                  <v-row>
                                    <v-col v-for="component in column.components" :key="component.id">
                                      <v-card class="no-border-card mb-2" :style="component.styles">
                                        <v-card-title>{{ component.label }}</v-card-title>
                                        <component-renderer :component="component" :readonly="true" />
                                      </v-card>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <!-- JSON View: Editable JSON view -->
      <v-tab-item>
        <v-container v-if="activeTab === 2">
          <v-textarea v-model="jsonEditorContent" label="Edit JSON" rows="20" @change="updatePageFromJson"></v-textarea>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ComponentRenderer from './ComponentRenderer.vue';

export default {
  props: {
    page: Object, // Receives the page object with layouts, rows, columns, and components
  },
  data() {
    return {
      activeTab: 0, // Default tab index (0 = Design, 1 = Preview, 2 = JSON)
      jsonEditorContent: '', // Holds the editable JSON content
    };
  },
  watch: {
    page: {
      handler(newPage) {
        this.jsonEditorContent = JSON.stringify(newPage, null, 2); // Convert the page object to JSON
      },
      deep: true, // Watches deeply into the page object to update JSON
    },
  },
  methods: {
    selectLayout(layout) {
      this.$emit('select-layout', layout); // Emit event to the parent to handle layout selection
    },
    selectRow(row) {
      this.$emit('select-row', row); // Emit event to the parent to handle row selection
    },
    selectColumn(column) {
      this.$emit('select-column', column); // Emit event to the parent to handle column selection
    },
    selectComponent(component) {
      this.$emit('select-component', component); // Emit event to the parent to handle component selection
    },
    // Emit events to parent for deletion
    removeLayout(layout) {
      this.$emit('remove-layout', layout);
    },
    removeRow(layout, row) {
      this.$emit('remove-row', { layout, row });
    },
    removeColumn(row, column) {
      this.$emit('remove-column', { row, column });
    },
    removeComponent(column, component) {
      this.$emit('remove-component', { column, component });
    },
    updateComponentModel(component, value) {
      this.$emit('update-model', component, value); // Emit event to update the component model
    },
    updatePageFromJson() {
      try {
        this.$emit('update-page-from-json', JSON.parse(this.jsonEditorContent)); // Convert JSON content to page object
      } catch (error) {
        alert('Invalid JSON structure');
      }
    },
  },
  components: {
    ComponentRenderer,
  },
};
</script>
<style scoped>
.selected-row {
  background-color: #f0f0f0;
  /* Or any other color */
}

.icon-button {
  background-color: red;
  /* You can adjust the color */
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
}

.material-icons {
  margin-left: 0px;
  /* Space between the icon and text */
  font-size: 24px;
  /* Adjust the size of the icon */
}

.no-border-card {
  box-shadow: none; /* Remove the shadow */
  border: none; /* Remove any potential border */
}
</style>