import { RowException } from "../exceptions/RowException";
import { BaseValidator } from "./BaseValidator";

export class RowValidator extends BaseValidator {

    validate(json: any): boolean {
        if (json.type === 'row') {
            if (!Array.isArray(json.columns)) {
                throw new RowException('Missing Columns');
            }
            return true;
        }
        return super.validate(json);
    }
}