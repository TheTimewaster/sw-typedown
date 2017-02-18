import { inject } from "aurelia-framework";
import { Router, RouteConfig, NavigationInstruction } from "aurelia-router";
import { MdDocumentService } from "services/MdDocumentService";
import { MdDocument } from "data/MdDocument";
import { markdown } from "markdown";
import * as MDL from "material-design-lite";
import * as $ from "jquery";

@inject(MdDocumentService, Element, Router)
export class DocsEdit
{
    private _docId: number;
    private _service: MdDocumentService;
    private _element: Element;
    private _router: Router;
    parsedContent: string

    public document: MdDocument;
    public editMode: boolean = false;
    public newDocTitle: string;

    constructor(service: MdDocumentService, element: Element, router: Router)
    {
        this._service = service;
        this._element = element;
        this._router = router;
    }

    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): Promise<any>
    {
        this._docId = params.id;
        let me = this
        // fetch current document from service
        return this._service.getDocument(this._docId).then((mdDoc: MdDocument) =>
        {
            // parse markdown document
            me.document = mdDoc;
            me.parsedContent = markdown.toHTML(me.document.content);

            // pass title
            me.newDocTitle = me.document.title;

            routeConfig.navModel.setTitle(me.document.title);
        }).catch((error: any) =>
        {
            console.log(error);
        });
    }

    attached()
    {
        let me = this;
        // pass the parsed HTML node to preview container
        document.querySelectorAll(".view-edit__preview-content")[ 0 ].innerHTML = me.parsedContent;

        // notify MDL to update components
        MDL.componentHandler.upgradeAllRegistered();

        /**
         * prevent adding div on enter when in edit mode
         * http://stackoverflow.com/questions/18552336/prevent-contenteditable-adding-div-on-enter-chrome
         */
        $(this._element).find("#view-edit__md-editor").keydown((e) =>
        {
            if (e.keyCode === 13)
            {
                // insert 2 br tags
                document.execCommand('insertHTML', false, '<br><br>');
                return false;
            }
        });
    }

    switchToEditMode()
    {
        this.editMode = !this.editMode;
        let textArea: HTMLElement = document.getElementById("view-edit__md-editor");
        textArea.textContent = this.document.content;
    }

    switchToPreviewMode()
    {
        // TODO: save when switch to preview mode
        this.editMode = !this.editMode;
        let textArea: HTMLElement = document.getElementById("view-edit__md-editor");

        // pass content from edit area to class member
        this.document.content = textArea.innerText;
        if (this.newDocTitle !== this.document.title)
        {
            this.document.title = this.newDocTitle;
        }

        // parse the content from input
        this.parsedContent = markdown.toHTML(this.document.content);

        // output to preview screen
        document.querySelectorAll(".view-edit__preview-content")[ 0 ].innerHTML = this.parsedContent;
    }
}