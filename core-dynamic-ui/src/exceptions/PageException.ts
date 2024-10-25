import { ValidationException } from "./ValidationException"

export class PageException extends ValidationException {
    constructor(message: string) {
        super(`Page Validation Failed: ${message}`);
        this.name = 'PageValidationException';
    }
}