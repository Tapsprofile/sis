<template>
  <div class="property-panel">
    <h2>Properties</h2>

    <div v-if="localElement">
      <h3>Node: {{ localElement?.data?.label || 'No Label' }}</h3>

      <!-- Property Descriptors -->
      <h4>Properties</h4>

      <div v-if="propertyDescriptors.length > 0">
        <div 
          v-for="(descriptor) in propertyDescriptors" 
          :key="`prop-${descriptor.key}`" 
          class="property-item"
        >
          <label :for="descriptor.key">{{ descriptor.name }}:</label>

          <input 
            v-if="descriptor.type === 'textField'" 
            v-model="localElement.data.properties[descriptor.key]" 
            :id="descriptor.key" 
            type="text" 
            @input="emitUpdate(descriptor.key, localElement.data.properties[descriptor.key])" 
          />

          <select 
            v-if="descriptor.type === 'dropdown'" 
            v-model="localElement.data.properties[descriptor.key]" 
            :id="descriptor.key" 
            @change="emitUpdate(descriptor.key, localElement.data.properties[descriptor.key])"
          >
            <option v-for="option in descriptor.options" :value="option" :key="option">{{ option }}</option>
          </select>
        </div>
      </div>

      <!-- Relationship Descriptors -->
      <h4>Relationships</h4>
      <div v-for="(relationship, index) in localElement?.data?.relationships || []" 
           :key="`rel-${index}`" 
           class="relationship-item">
        <label>Type:</label>
        <input 
          v-model="relationship.type" 
          type="text" 
          @input="updateRelationship(index, 'type', relationship.type)"
        />
        <label>Target:</label>
        <input 
          v-model="relationship.target" 
          type="text" 
          @input="updateRelationship(index, 'target', relationship.target)"
        />
        <button @click="removeRelationship(index)">Remove</button>
      </div>

      <button class="add-relationship" @click="addRelationship">Add Relationship</button>
    </div>

    <div v-else>
      <p>Select a node to view and edit its properties</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyPanel',
  props: ['selectedElement'],
  data() {
    return {
      localElement: null
    }
  },
  computed: {
    propertyDescriptors() {
      if (!this.localElement) return []

      if (this.localElement?.data?.propertiesDescriptors) {
        return this.localElement.data.propertiesDescriptors
      }

      return []
    }
  },
  watch: {
    selectedElement: {
      handler(newElement) {
        if (!newElement) {
          this.localElement = null
          return
        }

        const cleanElement = this.cleanElementForCloning(newElement) 
        this.localElement = structuredClone(cleanElement.node) 
        this.initializeProperties()
      },
      immediate: true
    }
  },
  methods: {
    initializeProperties() {
      if (!this.localElement) return
      if (!this.localElement.data) this.localElement.data = {}
      if (!this.localElement.data.properties) this.localElement.data.properties = {}

      const descriptors = this.propertyDescriptors
      descriptors.forEach((descriptor) => {
        if (!(descriptor.key in this.localElement.data.properties)) {
          this.localElement.data.properties[descriptor.key] = descriptor.defaultValue
        }
      })
    },

    emitUpdate(key, value) {
      if (this.localElement && this.localElement.id) {
        this.$emit('update-node', { id: this.localElement.id, key, value })
      }
    },

    updateRelationship(index, field, value) {
      this.localElement.data.relationships[index][field] = value
      this.$emit('update-node', { id: this.localElement.id, key: 'relationships', value: this.localElement.data.relationships })
    },

    addRelationship() {
      if (!this.localElement.data.relationships) {
        this.localElement.data.relationships = []
      }
      this.localElement.data.relationships.push({ type: 'success', target: '' })
      this.$emit('update-node', { id: this.localElement.id, key: 'relationships', value: this.localElement.data.relationships })
    },

    removeRelationship(index) {
      const removedRelationship = this.localElement.data.relationships[index]
      this.localElement.data.relationships.splice(index, 1)
      this.$emit('update-node', { id: this.localElement.id, key: 'relationships', value: this.localElement.data.relationships, removedRelationship })
    },

    cleanElementForCloning(element) {
      const cleanElement = { ...element }
      delete cleanElement.event 
      delete cleanElement.pointerEvent 
      delete cleanElement.mouseEvent 
      return cleanElement
    }
  }
}
</script>

<style scoped>
.property-panel {
  background-color: #f4f4f9;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}
</style>
