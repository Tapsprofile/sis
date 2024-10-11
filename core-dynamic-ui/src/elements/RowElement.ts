import { ColumnElement } from "./ColumnElement";
import { DynaElement } from "./DynaElement";

export class RowElement implements DynaElement {
    public type: string;
    public columns: ColumnElement[];
    public styles: any;
    public access: any;
    public visibility: boolean;

    constructor(
        type: string,
        columns: ColumnElement[],
        styles: any,
        access: any,
        visibility: boolean) {
        this.type = type;
        this.columns = columns;
        this.styles = styles;
        this.access = access;
        this.visibility = visibility;
    }

    addColumn(column: ColumnElement) {
        this.columns.push(column);
    }
    render(): void {
        this.columns.forEach((column) => column.render());
    }

}