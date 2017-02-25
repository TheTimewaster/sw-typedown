import { bindable, inject, bindingMode, customElement } from "aurelia-framework";

@inject(Element)
@customElement("doc-card")
export class DocCard
{
    @bindable({ defaultBindingMode: bindingMode.twoWay }) docInfo: Object;
    private _element: Element;

    constructor(element: Element)
    {
        this._element = element;
    }
}