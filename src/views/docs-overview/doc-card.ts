import { bindable, inject, bindingMode, customElement } from 'aurelia-framework';
import {DataAttributeObserver} from 'aurelia-binding';

@inject(Element)
@customElement("doc-card")
export class DocCard
{
    @bindable({ defaultBindingMode: bindingMode.twoWay }) docInfo: Object;
    _element: Element;

    constructor(element: Element)
    {
        this._element = element;
    }

    attached()
    {
        componentHandler.upgradeAllRegistered();
    }
}