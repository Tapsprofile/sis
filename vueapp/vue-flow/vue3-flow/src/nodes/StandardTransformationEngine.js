import BaseNode from './BaseNode'

export default class StandardTransformationEngine extends BaseNode {
  constructor(id) {
    super(id);
  }

  /**
   * Property descriptors for the StandardTransformationEngine
   * @returns {Array} - List of property descriptors
   */
  getPropertyDescriptors() {
    return [
      { name: 'Transformation Spec', key: 'transformation', type: 'textarea', defaultValue: '[]' },
      { name: 'Log Level', key: 'logLevel', type: 'dropdown', options: ['debug', 'info', 'warn', 'error'], defaultValue: 'info' }
    ]
  }

  /**
   * Relationship descriptors for the StandardTransformationEngine
   * @returns {Array} - List of relationship descriptors
   */
  getRelationshipDescriptors() {
    return [
      { type: 'success', target: '' }, // Target will be dynamically set when an edge is created
      { type: 'failure', target: '' } // Target will be dynamically set when an edge is created
    ]
  }
}
