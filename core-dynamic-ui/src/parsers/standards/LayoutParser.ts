import { parserRegistry } from '../ParserRegistry';
import { LayoutElement } from '../../elements/LayoutElement';
import { RowElement } from '../../elements/RowElement'; // Assuming RowElement exists

export class LayoutParser {
    // Parse a layout from the JSON and return a LayoutElement
    parse(json: any): LayoutElement {
        return new LayoutElement(
            json.type,
            json.name,
            this.parseRows(json.rows),
            this.parseStyles(json.styles),
            this.parseAccess(json.access),
            json.visibility !== undefined ? json.visibility : true // Default visibility to true
        );
    }

    /*
    Since below code is returning the Unknown Type for this collection and hence below is the fix for the Unknown to a Known Type
    We will just assign the Type to it. So parserRegistry.resolve<>('row') to parserRegistry.resolve<RowElement>('row')
    */
    // Parse the rows of the layout
    private parseRows(rowsJson: any[]): RowElement[] {
        return rowsJson.map((rowJson: any) => parserRegistry.resolve<RowElement>('row').parse(rowJson));
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

// Register the LayoutParser in the registry
parserRegistry.register<LayoutElement>('layout', new LayoutParser());
