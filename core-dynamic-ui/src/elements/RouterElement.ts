import { DynaElement } from './DynaElement';

export class RouterElement implements DynaElement {
    public path: string;
    public pageFile: string;
    public visibility: boolean;
    public access: {
        roles: string[];
    };

    constructor(
        path: string,
        pageFile: string,
        visibility: boolean,
        access: { roles: string[] }
    ) {
        this.path = path;
        this.pageFile = pageFile;
        this.visibility = visibility;
        this.access = access;
    }

    render(): void {
        // Not required just kept incase any debug needed
        throw new Error('Method not implemented.');
    }
}
