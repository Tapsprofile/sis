import { DynaElement } from "./DynaElement";

export class ComponentElement implements DynaElement {
    // type, properties, styles, access, visibility
    public type: string;
    public properties: any;
    public styles: any;
    public access: any;
    public visibility: boolean;

    constructor(
        type: string,
        properties: {},
        styles: {},
        access: {},
        visibility: boolean) {
        this.type = type;
        this.properties = properties;
        this.styles = styles;
        this.access = access;
        this.visibility = visibility;
    }

    render(): void {
        // TODO implementation to be done
        throw new Error("Method not implemented.");
    }
}