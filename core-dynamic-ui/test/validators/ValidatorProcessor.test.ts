import { ValidatorProcessor } from '../../src/validators/ValidatorProcessor';

import * as fs from 'fs';
import * as path from 'path';

// Utility function to load JSON files
const loadJson = (fileName: string) => {
    const filePath = path.resolve(__dirname, '../samples', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

describe('ValidatorProcessor', () => {
    let validatorProcessor: any;

    beforeEach(() => {
        // Initialize the validator chain
        validatorProcessor = ValidatorProcessor();
    });

    it('should validate a correct JSON structure without throwing an error', () => {
        const validJson = loadJson('validJson.json');
        expect(() => validatorProcessor.validate(validJson)).not.toThrow();
    });

    it('should throw an error for missing required fields', () => {
        const invalidJsonMissingField = loadJson('invalidJsonMissingField.json');
        expect(() => validatorProcessor.validate(invalidJsonMissingField)).toThrow(
            'PageValidator: Missing or invalid "title" field.'
        );
    });

    it('should throw an error for incorrect data types', () => {
        const invalidJsonIncorrectType = loadJson('invalidJsonIncorrectType.json');
        expect(() => validatorProcessor.validate(invalidJsonIncorrectType)).toThrow(
            'ColumnValidator: "width" must be a number.'
        );
    });
});
