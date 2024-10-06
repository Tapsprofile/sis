<template>
  <div v-if="component && component.elements" class="card mb-4">
    <div class="card-body">
      <div v-for="element in component.elements" :key="element.model">
        <component
          :is="getElementComponent(element.type)"
          v-bind="element"
          :modelValue="model[element.model]"
          @update:modelValue="value => updateModel(element.model, value)"
          @button-clicked="handleAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextField from './elements/TextField.vue';
import Dropdown from './elements/DropDown.vue';
import DateField from './elements/DateField.vue';
import ButtonElement from './elements/ButtonElement.vue';

export default {
  name: 'ComponentMaker',
  props: {
    component: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },
  components: {
    TextField,
    Dropdown,
    DateField,
    ButtonElement
  },
  methods: {
    getElementComponent(type) {
      switch (type) {
        case 'text':
          return TextField;
        case 'dropdown':
          return Dropdown;
        case 'date':
          return DateField;
        case 'button':
          return ButtonElement;
        default:
          return null;
      }
    },
    updateModel(key, value) {
      this.$emit('update:model', { key, value }); // Emit an event to update the model in the parent component
    },
    handleAction(action) {
      if (action === 'submitForm') {
        console.log('Form Submitted!', this.model);
      }
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
