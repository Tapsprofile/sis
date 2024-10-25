import { LayoutElement } from './LayoutElement';

export class PageElement {
    public type: string;
    public title: string;
    public path: string;
    public layouts: LayoutElement[];
    public styles: any;
    public access: any;
    public visibility: boolean;

    constructor(
        type: string,
        title: string,
        path: string,
        layouts: LayoutElement[],
        styles: any,
        access: any,
        visibility: boolean) {
        this.type = type;
        this.title = title;
        this.path = path;
        this.layouts = layouts;
        this.styles = styles;
        this.access = access;
        this.visibility = visibility;
    }

    addLayout(layout: LayoutElement): void {
        this.layouts.push(layout);
    }

    render(): void {
        this.layouts.forEach((layout) => layout.render());
    }
}
