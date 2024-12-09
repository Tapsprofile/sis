export default class BaseNode {
    constructor(id, position = { x: 0, y: 0 }) {
      this.id = id
      this.type = 'default'
      this.data = {
        label: this.constructor.name,
        properties: this.getDefaultProperties(), // Ensure properties are initialized
        propertiesDescriptors: this.getPropertyDescriptors(), // Ensure descriptors are loaded
        relationships: []
      }
      this.position = position // ✅ Position for VueFlow
    }
  
    /**
     * Gets the property descriptor for this node.
     */
    getPropertyDescriptors() {
      return []
    }
  
    /**
     * Returns the default properties to be used in the data
     */
    getDefaultProperties() {
      const descriptors = this.getPropertyDescriptors()
      return descriptors.reduce((acc, desc) => {
        acc[desc.key] = desc.defaultValue || ''
        return acc
      }, {})
    }
  
    /**
     * Add a new relationship to this node.
     */
    addRelationship(type, target) {
      this.data.relationships.push({ type, target })
    }
  
    /**
     * Remove a relationship by its type.
     */
    removeRelationship(type) {
      this.data.relationships = this.data.relationships.filter(rel => rel.type !== type)
    }
  }
  