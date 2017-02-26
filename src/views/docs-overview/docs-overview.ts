import { inject } from "aurelia-framework";
import { MdDocumentService } from "services/MdDocumentService";
import { MdDocumentList } from "data/MdDocumentList";
import * as MDL from "material-design-lite";

@inject(MdDocumentService, Element)
export class DocsOverview
{
    private _message: string;
    private _service: MdDocumentService;
    private _element: Element;
    mdDocList: MdDocumentList;

    constructor(service: MdDocumentService, element: Element)
    {
        this._message = "Hello!";
        this._service = service;
        this._element = element;
    }

    activate()
    {
        let me = this;
        this._service.fetchAllDocuments().then(function (docList: MdDocumentList)
        {
            me.mdDocList = docList;
        });
    }
    attached()
    {
        // update componentHandler for MDL
        MDL.componentHandler.upgradeElement(this._element);
    }
}