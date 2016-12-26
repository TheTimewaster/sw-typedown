import { inject } from "aurelia-framework";
import { MdDocumentService } from "../../services/MdDocumentService";
import { MdDocumentList } from "../../data/MdDocumentList";  

@inject(MdDocumentService)
export class DocsOverview
{
    private _message: string;
    private _service: MdDocumentService;
    _mdDocList: MdDocumentList;

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
            me._mdDocList = docList;
        });
    }
}