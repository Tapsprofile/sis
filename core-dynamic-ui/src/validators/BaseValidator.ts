import { Validator } from '../validators/Validator';

export abstract class BaseValidator implements Validator {
  private nextValidator?: Validator;

  // Set the next validator in the chain
  setNext(nextValidator: Validator): Validator {
    this.nextValidator = nextValidator;
    return nextValidator;
  }

  // Validate the JSON object or pass it to the next validator
  validate(json: any): boolean {
    if (this.nextValidator) {
      return this.nextValidator.validate(json);
    }
    return true; // Return true if no next validator is set and no issues found
  }
}
