import BaseNode from './BaseNode'

export default class QueryProcessor extends BaseNode {
  constructor(id, position) {
    super(id, position);
    this.type = this.getNodeType();
    this.data.type = this.getNodeType(); // ✅ This is required for VueFlow to recognize the type
    this.data.propertiesDescriptors = this.getPropertyDescriptors(); // ✅ Include the descriptors for PropertyPanel
  }

  /**
   * Returns the type of the node
   */
  getNodeType() {
    return 'queryProcessor';
  }

  /**
   * Property descriptors used for the PropertyPanel
   */
  getPropertyDescriptors() {
    return [
      {
        name: 'Database Type',
        key: 'databaseType',
        type: 'dropdown',
        options: ['SQLServer', 'MySQL'],
        defaultValue: 'SQLServer'
      },
      {
        name: 'Connection ID',
        key: 'connectionId',
        type: 'textField',
        defaultValue: 'SQLConnection'
      },
      {
        name: 'SQL Query',
        key: 'sqlQuery',
        type: 'textarea',
        defaultValue: ''
      },
      {
        name: 'Query Timeout',
        key: 'queryTimeout',
        type: 'dropdown',
        options: [10, 20, 30, 40],
        defaultValue: 30
      }
    ]
  }
}
