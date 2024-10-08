<!-- ModalElement.vue -->
<template>
    <BaseModal v-if="isVisible" @close-modal="closeModal">
      <!-- Modal header -->
      <div class="modal-header">
        <h5 class="modal-title">{{ title }}</h5>
      </div>
  
      <!-- Modal body -->
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
  
      <!-- Modal footer with buttons -->
      <div class="modal-footer">
        <button
          v-for="button in buttons"
          :key="button.label"
          class="btn btn-primary"
          @click="handleButtonClick(button)"
        >
          {{ button.label }}
        </button>
      </div>
    </BaseModal>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import BaseModal from '@/components/BaseModal.vue';
  
  export default {
    name: 'ModalElement',
    components: {
      BaseModal,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      buttons: {
        type: Array,
        default: () => [],
      },
      modelValue: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const isVisible = computed(() => props.modelValue);
  
      const closeModal = () => {
        debugger
        emit('update:modelValue', false); // Emit event to close the modal
      };
  
      const handleButtonClick = (button) => {
        if (button.action === 'closeModal') {
          closeModal();
        }
      };
  
      return {
        isVisible,
        closeModal,
        handleButtonClick,
      };
    },
  };
  </script>
  