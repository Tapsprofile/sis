export interface Validator {
    /**
     * Validate the Json Structure
     * @param json the JSON Object to validate
     * @returns boolean indicating success or throws an if Validation fails
     */
    validate(json: any): boolean;

    /*
        In here we need to set the next validator to support the validators as we progress.
    *   @param validator The next Validator to be called if current validation processes successfully.
    */
    setNext(validator: Validator): Validator;
}