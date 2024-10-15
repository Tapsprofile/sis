<template>
  <div>
    <v-text-field
      v-if="component.type === 'text'"
      :label="component.label"
      :placeholder="component.placeholder"
      @input="updateModel($event)"
    />

    <v-img
      v-if="component.type === 'image'"
      :src="component.src || 'https://via.placeholder.com/150'"
      alt="Placeholder Image"
    />

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
    updateModel(value) {
      this.$emit('update:model', value); // Emit updated value for input components
    },
    buttonClicked() {
      this.$emit('button-clicked', this.component); // Handle button clicks
    },
  },
};
</script>
