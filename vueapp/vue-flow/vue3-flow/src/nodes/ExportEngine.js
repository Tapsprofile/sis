import BaseNode from './BaseNode'

export default class ExportEngine extends BaseNode {
  constructor(id) {
    super(id);
  }

  /**
   * Property descriptors for the ExportEngine
   * @returns {Array} - List of property descriptors
   */
  getPropertyDescriptors() {
    return [
      { name: 'Export Format', key: 'exportFormat', type: 'dropdown', options: ['CSV', 'XLSX', 'JSON'], defaultValue: 'CSV' },
      { name: 'File Path', key: 'filePath', type: 'textField', defaultValue: '/exports/data.csv' },
      { name: 'Include Headers', key: 'includeHeaders', type: 'checkbox', defaultValue: true }
    ]
  }

  /**
   * Relationship descriptors for the ExportEngine
   * @returns {Array} - List of relationship descriptors
   */
  getRelationshipDescriptors() {
    return [
      { type: 'success', target: '' }, // Target will be dynamically set when an edge is created
      { type: 'failure', target: '' }  // Target will be dynamically set when an edge is created
    ]
  }
}
