<template>
    <v-card
      @click="selectRow"
      :style="{ backgroundColor: row.styles?.backgroundColor || '#ffffff' }"
    >
      <v-card-title>Row</v-card-title>
      <v-container>
        <v-row>
          <!-- Render columns inside the row -->
          <ColumnComponent
            v-for="column in row.columns"
            :key="column.id"
            :column="column"
            @selectComponent="$emit('selectComponent', $event)"
            :preview="preview"
          />
        </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script>
  import ColumnComponent from './ColumnComponent.vue';
  
  export default {
    props: {
      row: {
        type: Object,
        required: true,
      },
      preview: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      ColumnComponent,
    },
    methods: {
      selectRow() {
        // Emit the selected row to the parent
        this.$emit('selectRow', this.row);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for RowComponent */
  </style>
  