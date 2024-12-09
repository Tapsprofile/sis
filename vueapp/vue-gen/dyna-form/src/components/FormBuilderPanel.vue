<template>
  <v-card>
    <v-card-title>Form Builder</v-card-title>

    <v-tabs v-model="activeTab">
      <v-tab>Design</v-tab>
      <v-tab>Preview</v-tab>
      <v-tab>JSON</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <!-- Design View: Allows editing and adding elements -->
      <v-tab-item>
        <v-container v-if="activeTab === 0">
          <v-row v-for="layout in page.layouts" :key="layout.id">
            <v-col>
              <v-card @click="selectLayout(layout)">
                <v-card-title>
                  Layout
                  <v-icon @click.stop="removeLayout(layout)" class="ml-auto" color="red">
                    mdi-minus-circle-outline
                  </v-icon>
                </v-card-title>
                <v-container>
                  <v-row v-for="row in layout.rows" :key="row.id">
                    <v-col>
                      <v-card @click="selectRow(row)" class="no-border-card" :class="{ 'selected-row': row.id === selectedRowId }">
                        <v-card-title>
                          Row
                          <v-icon @click.stop="removeRow(layout, row)" class="ml-auto" color="red">
                            mdi-minus-circle-outline
                          </v-icon></v-card-title>
                        <v-container>
                          <v-row>
                            <v-col v-for="column in row.columns" :key="column.id" :cols="column.width" class="pa-2" :style="column.styles">
                              <v-card @click.stop="selectColumn(column)">
                                <v-card-title>
                                  Column ({{ column.width }}%)
                                  <v-icon @click.stop="removeColumn(row, column)" class="ml-auto" color="red">
                                    mdi-minus-circle-outline
                                  </v-icon></v-card-title>
                                <v-container>
                                  <v-row>
                                    <v-col v-for="component in column.components" :key="component.id">
                                      <v-card @click.stop="selectComponent(component)" class="mb-2" :style="component.styles">
                                        <v-card-title>{{ component.label }}</v-card-title>
                                        <component-renderer :component="component" />
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

      <!-- Preview View: Displays the structure without allowing edits -->
      <v-tab-item>
        <v-container v-if="activeTab === 1">
          <v-row v-for="layout in page.layouts" :key="layout.id">
            <v-col>
              <v-card class="no-border-card mb-6">
                <v-container>
                  <v-row v-for="row in layout.rows" :key="row.id">
                    <v-col>
                      <v-card class="no-border-card mb-2">
                        <v-container>
                          <v-row>
                            <v-col v-for="column in row.columns" :key="column.id" :cols="column.width" class="pa-2" :style="column.styles">
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
    // Emit events to the parent for selection
    selectLayout(layout) {
      this.$emit('select-layout', layout);
    },
    selectRow(row) {
      this.$emit('select-row', row);
    },
    selectColumn(column) {
      this.$emit('select-column', column);
    },
    selectComponent(component) {
      this.$emit('select-component', component);
    },

    // Emit events to the parent for removal
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

    // Update the page object from the JSON editor
    updatePageFromJson() {
      try {
        this.$emit('update-page-from-json', JSON.parse(this.jsonEditorContent));
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
