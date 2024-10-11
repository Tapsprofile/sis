import { Parser } from '../Parser'; // Import the Parser interface
import { parserRegistry } from '../ParserRegistry';
import { ComponentElement } from '../../elements/ComponentElement';
import { ColumnElement } from '../../elements/ColumnElement';

export class ColumnParser implements Parser<ColumnElement> {
  // Parse the column from the JSON and return a ColumnElement
  parse(json: any): ColumnElement {
    return new ColumnElement(
      json.type,
      json.width,
      this.parseComponents(json.components),
      this.parseStyles(json.styles),
      this.parseAccess(json.access),
      json.visibility !== undefined ? json.visibility : true // Default visibility to true
    );
  }

  // Parse the components inside the column using ComponentParser
  private parseComponents(componentsJson: any[]): ComponentElement[] {
    return componentsJson.map((componentJson: any): ComponentElement =>
      parserRegistry.resolve<ComponentElement>('component').parse(componentJson)
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

// Register the ColumnParser in the registry
parserRegistry.register<ColumnElement>('column', new ColumnParser());
