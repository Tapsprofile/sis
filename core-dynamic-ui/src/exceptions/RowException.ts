import { ValidationException } from "./ValidationException";

/*
* This is a high level exception to support the row level validator exceptions
*/
export class RowException extends ValidationException {
    constructor(message: string) {
        super(`Column Validation Failed: ${message}`);
        this.name = 'RowException';
    }
}