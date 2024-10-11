import { RowElement } from '../../elements/RowElement';
import { Parser } from '../Parser'; // Import the Parser interface
import { parserRegistry } from '../ParserRegistry';
import { ColumnElement } from '../../elements/ColumnElement';

export class RowParser implements Parser<RowElement> {
    // Parse the row from the JSON and return a RowElement
    parse(json: any): RowElement {
        return new RowElement(
            json.type,
            this.parseColumns(json.columns),
            this.parseStyles(json.styles),
            this.parseAccess(json.access),
            json.visibility !== undefined ? json.visibility : true // Default visibility to true
        );
    }

    // Parse the columns inside the row using ColumnParser
    private parseColumns(columnsJson: any[]): ColumnElement[] {
        return columnsJson.map((columnJson: any): ColumnElement =>
            parserRegistry.resolve<ColumnElement>('column').parse(columnJson)
        );
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

// Register the RowParser in the registry
parserRegistry.register<RowElement>('row', new RowParser());
