<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import LeftMenu from './components/LeftMenu.vue'
import PropertyPanel from './components/PropertyPanel.vue'
import Icon from './components/Icon.vue'

import QueryProcessor from './nodes/QueryProcessor.js'
import StandardTransformationEngine from './nodes/StandardTransformationEngine.js'
import ExportEngine from './nodes/ExportEngine.js'

const { onInit, onNodeDragStop, onConnect, addEdges, removeEdges, setViewport, toObject } = useVueFlow()

const nodes = ref([]) // List of nodes (processors)
const edges = ref([]) // List of edges (relationships)
const dark = ref(false) // Toggle dark mode
const selectedElement = ref(null) // Stores the currently selected node or edge

// Initial setup for VueFlow
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

// Handles node drag and drop
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

// Handles new edge creation
onConnect(({ source, target }) => {
  const edgeId = `edge-${source}-${target}`

  // Check if edge already exists to avoid duplicates
  const existingEdge = edges.value.find(edge => edge.id === edgeId)
  if (existingEdge) {
    console.warn(`Edge ${edgeId} already exists!`)
    return
  }

  const newEdge = {
    id: edgeId,
    source,
    target,
    type: 'smoothstep', // Use smoothstep for visual representation
    animated: true,
    label: 'success' // Default relationship type
  }

  const sourceNode = nodes.value.find(node => node.id === source)
  if (sourceNode) {
    const existingRelationship = sourceNode.data.relationships.find(rel => rel.target === target)
    if (!existingRelationship) {
      sourceNode.data.relationships.push({ type: 'success', target })
    }
  }

  edges.value.push(newEdge)
  addEdges(newEdge)
})

// 🛠️ Adds a new node of a given type
function addNode(type) {
  const nodeId = `node-${nodes.value.length + 1}`
  const nodeClassMap = {
    'QueryProcessor': QueryProcessor,
    'StandardTransformationEngine': StandardTransformationEngine,
    'ExportEngine': ExportEngine
  }

  if (nodeClassMap[type]) {
    const newNode = new nodeClassMap[type](nodeId)
    const lastNode = nodes.value[nodes.value.length - 1]
    const xOffset = 200 // Horizontal spacing
    const yOffset = 150 // Vertical spacing

    // Calculate position for the new node
    newNode.position = lastNode 
      ? { x: lastNode.position.x + xOffset, y: lastNode.position.y + yOffset } 
      : { x: 100, y: 100 } // Default starting position

    nodes.value.push(newNode)
  } else {
    console.error(`Unknown node type: ${type}`)
  }
}

// ✅ Remove edge properly using VueFlow API
function removeEdge(edgeId) {
  // Remove from the edges list
  edges.value = edges.value.filter(edge => edge.id !== edgeId)
  // Call VueFlow's removeEdges method to clean up internal references
  removeEdges([{ id: edgeId }])
}

// Reset the viewport to the default position
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

// Shuffle the positions of all nodes
function updatePos() {
  nodes.value = nodes.value.map((node, index) => ({
    ...node,
    position: {
      x: index * 150,
      y: index * 100,
    },
  }))
}

// Log the current graph structure
function logToObject() {
  console.log(toObject())
}

// Toggle dark mode
function toggleDarkMode() {
  dark.value = !dark.value
}

// Handle selection of nodes or edges
function handleSelection(element) {
  selectedElement.value = element
}

// Update node properties and relationships
function updateNode({ id, key, value, removedRelationship }) {
  const nodeToUpdate = nodes.value.find(node => node.id === id)
  if (nodeToUpdate) {
    if (key === 'relationships') {
      nodeToUpdate.data.relationships = value

      // ✅ Remove edge for the deleted relationship
      if (removedRelationship) {
        const edgeId = `edge-${id}-${removedRelationship.target}`
        removeEdge(edgeId)
      }
    } else {
      nodeToUpdate.data.properties[key] = value
    }
  }
}
</script>

<template>
  <div class="layout">
    <!-- Left Menu -->
    <LeftMenu class="left-menu" @add-node="addNode" />

    <!-- Center Vue Flow -->
    <div class="flow-container">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :class="{ dark }"
        class="basic-flow"
        @node-click="handleSelection"
        @edge-click="handleSelection"
        @connect="onConnect"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <MiniMap />
        <Controls position="top-left">
          <ControlButton title="Reset Transform" @click="resetTransform">
            <Icon name="reset" />
          </ControlButton>

          <ControlButton title="Shuffle Node Positions" @click="updatePos">
            <Icon name="update" />
          </ControlButton>

          <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
            <Icon v-if="dark" name="sun" />
            <Icon v-else name="moon" />
          </ControlButton>

          <ControlButton title="Log toObject" @click="logToObject">
            <Icon name="log" />
          </ControlButton>
        </Controls>
      </VueFlow>
    </div>

    <!-- Right Property Panel -->
    <PropertyPanel 
      class="right-panel" 
      :selectedElement="selectedElement" 
      @update-node="updateNode"
    />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.left-menu {
  width: 20%;
  background-color: #2c3e50;
}

.flow-container {
  width: 60%;
  position: relative;
}

.right-panel {
  width: 20%;
  background-color: #f4f4f9;
  overflow-y: auto;
}
</style>
