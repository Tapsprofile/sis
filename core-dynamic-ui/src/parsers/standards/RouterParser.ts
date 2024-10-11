import { RouterElement } from '../../elements/RouterElement'; // Import the RouterElement model
import { Parser } from '../Parser'; // Import the Parser interface
import { parserRegistry } from '../ParserRegistry'; // Import parserRegistry to register the parser

export class RouterParser implements Parser<RouterElement[]> {
    // Parse the router JSON and return an array of RouterElement instances
    parse(json: any): RouterElement[] {
        return json.routes.map((route: any) =>
            new RouterElement(
                route.path,
                route.pageFile,
                route.visibility !== undefined ? route.visibility : true, // Default visibility to true if not provided
                {
                    roles: route.access?.roles || [] // If access or roles aren't provided, default to an empty array
                }
            )
        );
    }
}

// Register the RouterParser in the parserRegistry
parserRegistry.register<RouterElement[]>('router', new RouterParser());
