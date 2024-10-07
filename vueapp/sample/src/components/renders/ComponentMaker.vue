<template>
    <div class="card mb-4">
      <div class="card-body">
        <div v-for="element in component.elements" :key="element.model">
          {{ element.type }}, {{ element.label }}, {{ element.model }}
          <component
            :is="getElementComponent(element.type)"
            v-bind="element"
            :modelValue="(model && model[element.model] !== undefined) ? model[element.model] : ''"
            @update:modelValue="value => updateModel(element.model, value)"
            @button-clicked="handleAction"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TextField from '@/components/elements/TextField.vue';
  import Dropdown from '@/components/elements/DropDown.vue';
  import DateField from '@/components/elements/DateField.vue';
  import ButtonElement from '@/components/elements/ButtonElement.vue';
  import eventHandlers from '@/services/eventHandlers.js'; // Import event handlers
  
  export default {
    name: 'ComponentMaker',
    props: {
      component: {
        type: Object,
        required: true
      },
      model: {
        type: Object,
        required: true,
        default: () => ({}) // Ensure model is always defined as an object
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
        // Ensure model is properly defined before updating
        if (this.model && key) {
            this.model[key] = value;
          //this.$set(this.model, key, value);
        } else {
          console.error(`Cannot update model: key or model is undefined`);
        }
      },
      handleAction(action) {
        if (action === 'submitForm') {
          console.log('Form Submitted!', this.model);
          // Pass model data to the event handler for further processing
          if (eventHandlers.onLoginClick) {
            eventHandlers.onLoginClick(this.model);
          }
        }
      },
      getEventHandlers(events = {}) {
        const handlers = {};
        for (const [event, handlerName] of Object.entries(events)) {
            debugger
          if (typeof eventHandlers[handlerName] === 'function') {
            handlers[event] = (...args) => eventHandlers[handlerName](...args, this.model);
          }
        }
        return handlers;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  