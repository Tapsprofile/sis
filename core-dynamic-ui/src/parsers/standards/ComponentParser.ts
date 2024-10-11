import { ComponentElement } from '../../elements/ComponentElement';
import { Parser } from '../Parser'; // Import the Parser interface
import { parserRegistry } from '../ParserRegistry';

// Generalized ComponentParser that handles different component types dynamically
export class ComponentParser implements Parser<ComponentElement> {
    // Parse the component based on its type and return an instance of ComponentElement
    parse(json: any): ComponentElement {
        return new ComponentElement(
            json.type,
            this.parseProperties(json),
            this.parseStyles(json.styles),
            this.parseAccess(json.access),
            json.visibility !== undefined ? json.visibility : true // Default to true if not provided
        );
    }

    // Generalized method to parse the properties of any component
    private parseProperties(json: any): any {
        const commonProperties = {
            title: json.title || '',
            value: json.value || '',
            icon: json.icon || '',
            color: json.color || ''
        };

        // Handle specific properties based on the component type
        switch (json.type) {
            case 'infoBox':
                return {
                    ...commonProperties
                };
            case 'chart':
                return {
                    ...commonProperties,
                    chartType: json.chartType,
                    data: json.data
                };
            default:
                return { ...commonProperties, ...json.properties };
        }
    }

    // Method to parse styles
    private parseStyles(styles: any): any {
        return styles || {}; // Default to an empty object if no styles are provided
    }

    // Method to parse access controls
    private parseAccess(access: any): any {
        return access || {}; // Default to an empty object if no access controls are provided
    }
}

// Register the generalized ComponentParser in the registry
parserRegistry.register<ComponentElement>('component', new ComponentParser());
