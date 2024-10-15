<template>
    <div class="card mb-4">
        <div class="card-body">
            <div v-if="loading" class="text-center">
                Loading components...
            </div>
            <div v-else-if="error" class="alert alert-danger" role="alert">
                {{ error }}
            </div>
            <div v-else>
                <div v-for="element in component.elements" :key="element.model || element.id">
                    <component :is="getElementComponent(element.type)" v-bind="element" v-model="model[element.model]"
                        @update:modelValue="value => updateModel(modalConfig.id, value)"
                        @click.native="handleClick(element)" />
                </div>

                <!-- Conditionally render the modal -->
                <component v-if="modalElement" :is="modalElement" v-bind="modalConfig" v-model="model[modalConfig.id]"
                    @update:modelValue="handleModalValueUpdate" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComponentMaker',

    // props passed from the parent (typically the configuration and the model)
    props: {
        component: {
            type: Object,
            required: true,
        },
        model: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },

    // Local state data
    data() {
        return {
            elementComponents: {}, // Stores the dynamically loaded components
            eventHandlers: null, // Stores dynamically loaded event handlers
            loading: true, // Check whether the components are being loaded
            error: null,  // Stores any error that occurs
            modalElement: null,  // Model Compont if needed
            modalConfig: null,   // Holds the modal's configuration (title, content, etc.)
        };
    },

    // This is a lifecycle method when the component is created
    async created() {
        try {
            await this.initializeComponent(); // Initializes components and event handlers
        } catch (e) {
            console.error('Error during dynamic import of components or handlers:', e);
            this.error = 'An unexpected error occurred while loading components or event handlers.';
        } finally {
            this.loading = false; // Set loading to false once initialization is complete
        }
    },

    methods: {

        handleModalVisibility(modalId, isVisible) {
            if (isVisible) {
                this.modalElement = this.getElementComponent('modal');
            } else {
                this.modalElement = null; // Close the modal
            }
        },

        handleModalValueUpdate(value) {
            this.updateModel(this.modalConfig.id, value); // Now call the updateModel method
            this.handleModalVisibility(this.modalConfig.id, value);
        },

        // Initialize the 
        async initializeComponent() {
            // Ensure model properties exist for each element
            this.component.elements.forEach((element) => {
                if (!this.model.hasOwnProperty(element.model) && element.model) {
                    this.model[element.model] = ''; // Initialize with empty string for Text Fields, etc
                } else if (element.type === 'modal') {
                    this.model[element.id] = false; // Initialize modal visibility to false
                }
            });

            // Load the component-specific event handler if defined, else use the default event handler
            if (this.component.eventHandlers) {
                debugger
                await this.loadEventHandler(this.component.eventHandlers);
            } else {
                const defaultHandlerName = `${this.component.type}EventHandlers`;
                await this.loadEventHandler(defaultHandlerName);
            }

            // Load the element components dynamically
            const modules = import.meta.glob('@/components/elements/*.vue');
            for (const path in modules) {
                try {
                    const component = await modules[path]();
                    const componentName = this.normalizeComponentName(path);
                    this.elementComponents[componentName] = component.default;
                } catch (e) {
                    console.error(`Error loading component at ${path}:`, e);
                    this.error = `Failed to load some components. Check console for details.`;
                }
            }
        },

        async loadEventHandler(handlerName) {
            try {
                console.log(">>>>>"+handlerName);
                const handlerModule = await import(`@/services/${handlerName}.js`);
                this.eventHandlers = handlerModule.default;
            } catch (e) {
                console.warn(`Event handler module "${handlerName}" not found. Falling back to default eventHandlers.`);
                const defaultHandlerModule = await import('@/services/eventHandlers.js');
                this.eventHandlers = defaultHandlerModule.default;
            }
        },

        normalizeComponentName(path) {
            let componentName = path.split('/').pop().replace('.vue', '');
            return componentName.toLowerCase();
        },

        getElementComponent(type) {
            try {
                const normalizedType = type.toLowerCase() + 'element';
                return this.elementComponents[normalizedType] || null;
            } catch (e) {
                console.error(`Error getting element component of type "${type}":`, e);
                this.error = `An error occurred while retrieving the component of type "${type}".`;
                return null;
            }
        },

        updateModel(key, value) {
            try {
                debugger
                if (this.model && key) {
                    this.model[key] = value;
                } else {
                    throw new Error('Key or model is undefined');
                }
            } catch (e) {
                console.error(`Error updating model with key "${key}":`, e);
                this.error = `An error occurred while updating the model for key "${key}".`;
            }
        },

        handleClick(element) {
            if (element.events && element.events.click && this.eventHandlers) {
                const handlerName = element.events.click;
                const handler = this.eventHandlers[handlerName];

                if (typeof handler === 'function') {
                    handler(this.model);

                    // Check if the element is a modal and should be displayed
                    if (element.type === 'button' && element.action === 'showModal') {
                        const modal = this.component.elements.find((e) => e.type === 'modal');
                        if (modal) {
                            this.modalElement = this.getElementComponent('modal');
                            this.modalConfig = modal;  // Store the modal's configuration
                            this.model[modal.id] = true; // Make the modal visible
                        } else {
                            debugger
                            this.modalElement = this.getElementComponent('modal');
                            this.modalConfig = modal;  // Store the modal's configuration
                            this.model[modal.id] = false; // Make the modal visible
                        }
                    }
                } else {
                    console.warn(`Handler function ${handlerName} not found in eventHandlers.`);
                }
            }
        },
    },
};
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.alert {
    margin-top: 1rem;
}
</style>