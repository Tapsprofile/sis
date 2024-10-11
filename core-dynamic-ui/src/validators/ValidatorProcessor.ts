// Now here is the process of the validator to be supported over here.

import { ColumnValidator } from "./ColumnValidator";
import { ComponentValidator } from "./ComponentValidator";
import { LayoutValidator } from "./LayoutValidator";
import { PageValidator } from "./PageValidator"
import { RowValidator } from "./RowValidator";

export const ValidatorProcessor = (): PageValidator => {

    const pageValidator = new PageValidator();
    const layoutValidator = new LayoutValidator();
    const rowValidator = new RowValidator();
    const columnValidator = new ColumnValidator();
    const componentValidator = new ComponentValidator();

    pageValidator
        .setNext(layoutValidator)
        .setNext(rowValidator)
        .setNext(columnValidator)
        .setNext(componentValidator);

    return pageValidator;
}