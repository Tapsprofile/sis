<template>
  <div>
    <!-- Text Field Component -->
    <v-text-field
      v-if="component.type === 'text'"
      :label="component.label"
      :placeholder="component.placeholder"
      @input="updateModel($event)"
    />

    <!-- Image Component -->
    <v-img
      v-if="component.type === 'image'"
      :src="component.src || 'https://via.placeholder.com/150'"
      alt="Placeholder Image"
    />

    <!-- Button Component -->
    <v-btn
      v-if="component.type === 'button'"
      :style="component.styles"
      @click="buttonClicked"
    >
      {{ component.label }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Emit updated value for input components
    updateModel(value) {
      this.$emit('update:model', value); // For text fields, emit the updated value
    },
    // Emit event when button is clicked
    buttonClicked() {
      this.$emit('button-clicked', this.component); // Handle button clicks
    },
  },
};
</script>
