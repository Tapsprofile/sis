import { LayoutValidationException } from "../exceptions/LayoutValidationException";
import { BaseValidator } from "./BaseValidator";

export class LayoutValidator extends BaseValidator {
    validate(json: any): boolean {
        if (json.type === 'layout') {

            if (!json.name || !Array.isArray(json.rows)) {
                throw new LayoutValidationException('Invalid Layout Structure');
            }
            return true;
        }

        return super.validate(json);
    }
}