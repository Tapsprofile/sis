import { ValidationException } from "./ValidationException"

export class RouterException extends ValidationException {
    constructor(message: string) {
        super(`Page Validation Failed: ${message}`);
        this.name = 'RouterValidationException';
    }
}