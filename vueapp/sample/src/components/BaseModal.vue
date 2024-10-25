<!-- BaseModal.vue -->
<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal-display">
      <span class="close" @click="closeModal">&times;</span>
      <slot></slot> <!-- Content passed from parent component -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  methods: {
    closeModal() {
      // Emit an event to close the modal
      this.$emit('close-modal');
    }
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-display {
  background: white;
  border-radius: 5px;
  padding: 20px;
  width: 500px;
  max-width: 100%;
}

.close {
  font-size: 24px;
  cursor: pointer;
  float: right;
}
</style>
