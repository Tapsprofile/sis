<template>
    <div class="left-menu">
      <h2>Node Menu</h2>
  
      <!-- Dynamic Node List -->
      <ul class="menu-list">
        <li 
          v-for="(node, index) in nodeMenu" 
          :key="index" 
          class="menu-item"
        >
          <button @click="addNode(node.type)">
            <span class="node-icon">{{ node.icon }}</span> 
            <span class="node-label">{{ node.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LeftMenu',
    emits: ['add-node'],
    data() {
      return {
        nodeMenu: [
          { type: 'QueryProcessor', label: 'Query Processor', icon: '🔍' },
          { type: 'StandardTransformationEngine', label: 'Transformation Engine', icon: '⚙️' },
          { type: 'ExportEngine', label: 'Export Engine', icon: '📤' }
        ]
      }
    },
    methods: {
      /**
       * Emits the add-node event with the node type
       * @param {string} type - The type of the node to be added
       */
      addNode(type) {
        this.$emit('add-node', type)
      }
    }
  }
  </script>
  
  <style scoped>
  .left-menu {
    background-color: #2c3e50;
    color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .menu-list {
    list-style-type: none;
    padding: 0;
  }
  
  .menu-item {
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: none;
    background-color: #34495e;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #1abc9c;
  }
  
  .node-icon {
    margin-right: 10px;
    font-size: 20px;
  }
  
  .node-label {
    flex: 1;
    text-align: left;
  }
  </style>
  