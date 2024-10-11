import { ComponentElement } from "./ComponentElement";
import { DynaElement } from "./DynaElement";

export class ColumnElement implements DynaElement {
    public type: string;
    public components: ComponentElement[];
    public width: number;
    public styles: any;
    public access: any;
    public visibility: boolean;

    constructor(
        type: string,
        width: number,
        components: ComponentElement[],
        styles: any,
        access: any,
        visibility: boolean
    ) {
        this.type = type;
        this.width = width;
        this.components = components;
        this.styles = styles;
        this.access = access;
        this.visibility = visibility;
    }

    addComponent(component: ComponentElement) {
        this.components.push(component);
    }

    render(): void {
        this.components.forEach((component) => component.render());
    }

}