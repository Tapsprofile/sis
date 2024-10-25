import { ColumnException } from "../exceptions/ColumnException";
import { BaseValidator } from "./BaseValidator";

export class ColumnValidator extends BaseValidator {
    validate(json: any): boolean {
        if (json.type === 'column') {
            if (typeof json.width !== 'number' || !Array.isArray(json.components)) {
                throw new ColumnException('Missing number or components');
            }
            return true;
        }
        return super.validate(json);
    }
}