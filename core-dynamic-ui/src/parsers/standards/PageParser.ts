import { PageElement } from '../../elements/PageElement';
import { Parser } from '../Parser'; // Import the Parser interface
import { parserRegistry } from '../ParserRegistry';
import { LayoutElement } from '../../elements/LayoutElement';

export class PageParser implements Parser<PageElement> {
    // Parse the page from the JSON and return a PageElement
    parse(json: any): PageElement {
        return new PageElement(
            json.type,
            json.title,
            json.path,
            this.parseLayouts(json.layouts),
            this.parseStyles(json.styles),
            this.parseAccess(json.access),
            json.visibility !== undefined ? json.visibility : true // Default visibility to true
        );
    }

    // Parse the layouts inside the page using LayoutParser
    private parseLayouts(layoutsJson: any[]): LayoutElement[] {
        return layoutsJson.map((layoutJson: any): LayoutElement =>
            parserRegistry.resolve<LayoutElement>('layout').parse(layoutJson)
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

// Register the PageParser in the registry
parserRegistry.register<PageElement>('page', new PageParser());
