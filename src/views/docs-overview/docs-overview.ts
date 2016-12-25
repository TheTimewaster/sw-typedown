import { inject } from "aurelia-framework";
import { DocumentService } from "../../services/DocumentService";
import { DocumentList } from "../../data/DocumentList";  

@inject(DocumentService)
export class DocsOverview
{
    _message: string;
    _service: DocumentService;
    docList: DocumentList;

    constructor(service: DocumentService)
    {
        this._message = "Hello!";
        this._service = service;
    }

    activate()
    {
        let me = this;
        this._service.getFiles().then(function (docList: DocumentList)
        {
            me.docList = docList;
        });

         window.componentHandler.upgradeAllRegistered();
    }
}