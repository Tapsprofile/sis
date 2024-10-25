// ParserRegistry.ts

// This takes a json as input and returns an object of type T.
type Parser<T> = {
    parse: (json: any) => T;
};

// This is going to register individual Elements of a Json
export class ParserRegistry {

    private registry: { [key: string]: Parser<any> } = {};

    // Register a parser for a given tag
    register<T>(tag: string, parserClass: Parser<T>): void {
        this.registry[tag] = parserClass;
    }

    // Resolve the parser for a given tag
    resolve<T>(tag: string): Parser<T> {
        const parserClass = this.registry[tag];
        if (!parserClass) {
            throw new Error(`Parser for tag "${tag}" is not registered.`);
        }
        return parserClass;
    }
}

// Export a singleton instance of ParserRegistry
export const parserRegistry = new ParserRegistry();
