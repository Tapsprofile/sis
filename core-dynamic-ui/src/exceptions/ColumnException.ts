import { ValidationException } from "./ValidationException";

/*
* This is a high level exception to support the column level validator exceptions
*/
export class ColumnException extends ValidationException {
    constructor(message: string) {
        super(`Column Validation Failed: ${message}`);
        this.name = 'ColumnException';
    }
}