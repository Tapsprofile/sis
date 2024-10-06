<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <!-- Left Side Menu -->
      <div class="col-md-3">
        <MenuComponent :menuItems="jsonData.menuItems" @item-selected="selectComponent" />
      </div>

      <!-- Right Side Component Renderer -->
      <div class="col-md-9">
        <ComponentRenderer :component="selectedComponent" v-model="formData" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from './components/MenuComponent.vue';
import ComponentRenderer from './components/ComponentRenderer.vue';

export default {
  name: 'App',
  data() {
    return {
      jsonData: {
        menuItems: [
          {
            label: 'Login Details',
            type: 'loginComponent',
            elements: [
              { type: 'text', label: 'Email', model: 'email' },
              { type: 'text', label: 'Password', model: 'password' },
              { type: 'date', label: 'Date of Birth', model: 'dob' },
              { type: 'button', label: 'Login', model: 'submit' }
            ]
          },
          {
            label: 'Payment Details',
            type: 'paymentComponent',
            elements: [
              { type: 'text', label: 'Card Number', model: 'cardNumber' },
              { type: 'date', label: 'Expiry Date', model: 'expiryDate' },
              { type: 'text', label: 'Card Name', model: 'cardName' },
              { type: 'text', label: 'CVV', model: 'cvv' }
            ]
          },
          {
            label: 'Dropdown Details',
            type: 'dropdownComponent',
            elements: [
              {
                type: 'dropdown',
                label: 'Country',
                model: 'country',
                options: ['USA', 'Canada', 'Australia']
              },
              {
                type: 'dropdown',
                label: 'State',
                model: 'state',
                dependsOn: 'country',
                optionsMap: {
                  USA: ['California', 'New York', 'Texas'],
                  Canada: ['Ontario', 'Quebec', 'British Columbia'],
                  Australia: ['New South Wales', 'Victoria', 'Queensland']
                }
              }
            ]
          }
        ]
      },
      selectedComponent: null,
      formData: {} // Initially empty, will be populated with the required properties.
    };
  },
  methods: {
    selectComponent(type) {
      // Find the selected component from jsonData.menuItems by type
      this.selectedComponent = this.jsonData.menuItems.find(
        (item) => item.type === type
      );

      // Initialize formData properties based on the selected component elements.
      this.formData = {};
      if (this.selectedComponent) {
        this.selectedComponent.elements.forEach((element) => {
          console.log(element.model);
          this.formData[element.model] = '';
         //this.$set(this.formData, element.model, '');
        });
      }
    }
  },
  components: {
    MenuComponent,
    ComponentRenderer
  }
};
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
}
</style>
