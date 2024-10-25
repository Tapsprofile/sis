// eventHandlers.js
export function handleColumnSelect(selectedColumn, context) {
  context.selectedColumn = selectedColumn;
  context.selectedComponent = null;
}

export function handleComponentSelect(selectedComponent, context) {
  context.selectedComponent = selectedComponent;
  context.selectedColumn = null;
}
