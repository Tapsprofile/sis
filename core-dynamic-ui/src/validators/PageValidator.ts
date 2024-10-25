import { PageException } from "../exceptions/PageException";
import { BaseValidator } from "./BaseValidator";

export class PageValidator extends BaseValidator {

    validate(json: any): boolean {
        if (json.type === 'page') {
            // Check if the 'title' and 'layouts' fields are present
            if (!json.title || !json.path || typeof json.title !== 'string' || typeof json.path !== 'string') {
                throw new PageException('Invalid Page structure. Missing title, path.');
            }
            if (!json.layouts || !Array.isArray(json.layouts)) {
                throw new PageException('Invalid  layouts.');
            }
            // If the page structure is valid, return true
            return true;
        }

        // Continue the chain
        return super.validate(json);
    }
}