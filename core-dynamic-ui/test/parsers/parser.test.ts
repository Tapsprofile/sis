import { LayoutParser } from '../../src/parsers/standards/LayoutParser';
import { RowParser } from '../../src/parsers/standards/RowParser';
import { parserRegistry } from '../../src/parsers/ParserRegistry'; // Import the registry
import * as fs from 'fs';
import * as path from 'path';
import { PageParser } from '../../src/parsers/standards/PageParser';
import { ColumnParser, ComponentParser, LayoutElement, PageElement } from '../../src';

// Utility function to load JSON files
const loadJson = (fileName: string) => {
    const filePath = path.resolve(__dirname, '../samples', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

describe('Parser Tests', () => {

    // Register the parsers before running the tests
    beforeAll(() => {
        parserRegistry.register('page', new PageParser());
        parserRegistry.register('layout', new LayoutParser());
        parserRegistry.register('row', new RowParser());
        parserRegistry.register('column', new ColumnParser());
        parserRegistry.register('component', new ComponentParser());
    });

    it('should correctly parse a valid Page JSON into PageElement', () => {
        const validPageJson = loadJson('validJson.json');
        const pageParser = parserRegistry.resolve<PageElement>('page');
        const parsedPage = pageParser.parse(validPageJson);

        expect(parsedPage).toBeTruthy();
        expect(parsedPage.type).toBe('page');
        expect(parsedPage.title).toBe('Dashboard');
        expect(parsedPage.layouts.length).toBe(1);
    });


    // Add more tests as needed

});
