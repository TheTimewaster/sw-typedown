import { inject } from "aurelia-framework";
import { MdDocumentService } from "../../services/MdDocumentService";
import { MdDocumentList } from "../../data/MdDocumentList";
import * as MDL from "material-design-lite";

@inject(MdDocumentService)
export class DocsOverview
{
    private _message: string;
    private _service: MdDocumentService;
    mdDocList: MdDocumentList;

    constructor(service: MdDocumentService)
    {
        this._message = "Hello!";
        this._service = service;
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
        MDL.componentHandler.upgradeAllRegistered();
    }
}