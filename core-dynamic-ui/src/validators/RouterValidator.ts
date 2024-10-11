import { RouterException } from "../exceptions/RouterException";
import { BaseValidator } from "./BaseValidator";

export class RouterValidator extends BaseValidator {

    validate(json: any): boolean {
        if (!json.path || !json.pageFile) {
            throw new RouterException('Invalid Route structure. Missing path, or pageFile.');
        }

        // Continue the chain
        return super.validate(json);
    }
}