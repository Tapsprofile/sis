<template>
    <div class="row">
      <!-- Left Side Menu -->
      <div class="col-md-3">
        <div v-if="jsonData && jsonData.menuItems">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="item in jsonData.menuItems"
              :key="item.type"
              @click="selectComponent(item.type)"
              :class="{ active: selectedType === item.type }"
              style="cursor: pointer;"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Right Side Dynamic Component Renderer -->
      <div class="col-md-9">
        <ComponentRenderer v-if="selectedComponent" :component="selectedComponent" v-model="formData" />
      </div>
    </div>
  </template>
  
  <script>
  import ComponentRenderer from '@/components/renders/ComponentRenderer.vue';
  
  export default {
    name: 'DynaComponent',
    components: {
      ComponentRenderer
    },
    data() {
      return {
        jsonData: null, // Holds the fetched data
        selectedComponent: null, // Holds the currently selected component to be rendered
        formData: {}, // Ensure formData is always initialized to an empty object
        selectedType: null // Holds the type of the selected component
      };
    },
    methods: {
      async loadSampleData() {
        try {
          const response = await fetch('/src/assets/data/sampledata.json');
          if (!response.ok) {
            throw new Error(`Error loading sample data: ${response.statusText}`);
          }
          this.jsonData = await response.json();
        } catch (error) {
          console.error('Error loading sample JSON data:', error);
        }
      },
      selectComponent(type) {
        if (this.jsonData) {
          this.selectedComponent = this.jsonData.menuItems.find((item) => item.type === type);
          this.selectedType = type;
  
          // Initialize formData with the default values for all element models
          this.formData = {};
          if (this.selectedComponent) {
            this.selectedComponent.elements.forEach((element) => {
                this.formData[ element.model] = '';
             // this.$set(this.formData, element.model, ''); // Initialize with an empty string
            });
          }
        }
      }
    },
    async created() {
      await this.loadSampleData();
    }
  };
  </script>
  
  <style scoped>
  .list-group-item.active {
    background-color: #007bff;
    color: #fff;
  }
  </style>
  