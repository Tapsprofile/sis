/*
* This is a Validation related Exception which is further extended by each level of valitors
*/
export class ValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidatorException';
    }
}