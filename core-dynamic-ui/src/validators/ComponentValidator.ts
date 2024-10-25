import { ComponentException } from "../exceptions/ComponentException";
import { BaseValidator } from "./BaseValidator";

export class ComponentValidator extends BaseValidator {
    validate(json: any): boolean {
        if (json.type === 'component') {
            if (!json.type || !json.properties) {
                throw new ComponentException('Missing type or properties');
            }
            return true;
        }
        return super.validate(json);
    }
}