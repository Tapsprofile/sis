import { DynaElement } from './DynaElement';
import { RowElement } from './RowElement';

export class LayoutElement implements DynaElement {
    public type: string;
    public name: string;
    public rows: RowElement[];
    public styles: any;
    public access: any;
    public visibility: boolean;

    constructor(
        type: string,
        name: string,
        rows: RowElement[],
        styles: any,
        access: any,
        visibility: boolean
    ) {
        this.type = type;
        this.name = name;
        this.rows = rows;
        this.styles = styles;
        this.access = access;
        this.visibility = visibility;
    }

    addRow(row: RowElement): void {
        this.rows.push(row);
    }

    render(): void {
        this.rows.forEach((row) => row.render());
    }
}
