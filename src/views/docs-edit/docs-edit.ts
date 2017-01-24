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
    public editMode: boolean = false

    constructor(service: MdDocumentService)
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

        // fetch current document from service
        this._service.getDocument(this._docId).then((mdDoc: MdDocument) =>
        {
            // parse markdown document
            me.document = mdDoc;
            me.parsedContent = markdown.toHTML(me.document.content);

            // pass the parsed HTML node to preview container
            document.querySelectorAll(".view-edit__preview")[ 0 ].innerHTML = me.parsedContent;

            // notify MDL to update components
            componentHandler.upgradeAllRegistered();
        }).catch((error: any) =>
        {
            console.log(error);
        });
    }

    switchToEditMode()
    {
        this.editMode = !this.editMode;
        let textArea : HTMLElement = document.getElementById("view-edit__md-editor");
        textArea.textContent = this.document.content;
    }

    switchToPreviewMode()
    {
        // TODO: save when switch to preview mode
        this.editMode = !this.editMode;
        let textArea : HTMLElement = document.getElementById("view-edit__md-editor");

        // pass content from edit area to class member
        this.document.content = textArea.textContent;

        // parse the content from input
        this.parsedContent = markdown.toHTML(this.document.content);

        // output to preview screen
        document.querySelectorAll(".view-edit__preview")[ 0 ].innerHTML = this.parsedContent;
    }
}