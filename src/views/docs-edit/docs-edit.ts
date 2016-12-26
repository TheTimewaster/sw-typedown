import { RouteConfig, NavigationInstruction, RoutableComponentActivate } from "aurelia-router";
import { inject } from "aurelia-framework";
import { MdDocumentService } from "../../services/MdDocumentService";
import { MdDocument } from "../../data/MdDocument";
import { markdown } from "markdown";

@inject(MdDocumentService)
export class DocsEdit implements RoutableComponentActivate
{
    private _docId: number;
    private _service: MdDocumentService;
    parsedContent: string

    public document: MdDocument;

    constructor(service: MdDocumentService, md: Markdown)
    {
        this._service = service;
    }

    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): void
    {
        this._docId = params.id;
    }

    attached()
    {
        let me = this;

        this._service.getDocument(this._docId).then((mdDoc: MdDocument) =>
        {
            me.document = mdDoc;
            me.parsedContent = markdown.toHTML(me.document.content);

            document.querySelectorAll(".md-content")[ 0 ].innerHTML = me.parsedContent;
        }).catch((error: any) =>
        {
            console.log(error);
        });
    }
}