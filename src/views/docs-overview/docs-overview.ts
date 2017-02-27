import { inject } from "aurelia-framework";
import { MdDocumentService } from "services/MdDocumentService";
import { MdDocumentObject } from "data/MdDocument";
import { Router } from "aurelia-router";
import * as MDL from "material-design-lite";

@inject(MdDocumentService, Element, Router)
export class DocsOverview
{
    private _service: MdDocumentService;
    private _element: Element;
    private _mdDocList: Array<MdDocumentObject>;
    private _router: Router;

    constructor(service: MdDocumentService, element: Element, router: Router)
    {
        this._service = service;
        this._element = element;
        this._router = router;
    }

    attached()
    {
        let me = this;
        this._service.fetchAllDocuments().then((docList: Array<MdDocumentObject>) =>
        {
            me._mdDocList = docList;
            // update componentHandler for MDL
            MDL.componentHandler.upgradeElement(me._element);
        });
    }

    createNewDocument($event)
    {
        this._router.navigateToRoute("doc", { id: "new" });
    }
}