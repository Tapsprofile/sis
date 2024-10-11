import { ValidationException } from "./ValidationException";

/*
* This is a high level exception to support the Component level validator exceptions
*/
export class ComponentException extends ValidationException {
    constructor(message: string) {
        super(`Component Validation Failed: ${message}`);
        this.name = 'ComponentException';
    }
}