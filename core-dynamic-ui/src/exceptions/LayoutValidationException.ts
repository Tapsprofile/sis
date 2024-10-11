import { ValidationException } from "./ValidationException";
/*
*    Layout Exception typically works on the level after the Page Level Exceptions
*/
export class LayoutValidationException extends ValidationException {
    constructor(message: string) {
        super(`Layout Validation Failed: ${message}`);
        this.name = 'LayoutValidationException';
    }
}