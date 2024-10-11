export interface Parser<T> {
    /*
        Parses a json object into a structured Entity.
        @param json This is going to be a Json object representing the structure (Page, Layout, etc.)
        @returns A structured entity of type T (Page, Layout, Row, Etc.).
    */
    parse(json: any): T;
}