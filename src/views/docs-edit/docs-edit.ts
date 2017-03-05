import { inject } from "aurelia-framework";
import { Router, RouteConfig, NavigationInstruction } from "aurelia-router";
import { MdDocumentService } from "services/MdDocumentService";
import { MdDocument, MdDocumentObject } from "data/MdDocument";
import * as MDL from "material-design-lite";
import * as $ from "jquery";
import * as SimpleMDE from "simplemde";
import EditorConfig from "./EditorConfig";


@inject(MdDocumentService, Element, Router)
export class DocsEdit
{
    private _docId: string;
    private _service: MdDocumentService;
    private _element: Element;
    private _router: Router;
    private _editor: SimpleMDE;
    parsedContent: string;

    public document: MdDocument;
    public editMode: boolean = false;
    public newDocTitle: string;

    constructor(service: MdDocumentService, element: Element, router: Router)
    {
        this._service = service;
        this._element = element;
        this._router = router;
    }

    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction)
    {
        this._docId = params.id;
        let me = this;
    }

    attached()
    {
        let me = this;
        // fetch current document from service
        this._service.getDocument(this._docId)
            .then((mdDoc: MdDocumentObject) =>
            {
                // parse markdown document
                me.document = new MdDocument(mdDoc._title, mdDoc._id, mdDoc._lastModified, mdDoc._content);
                // pass title
                me.newDocTitle = me.document.title;
                // set title
                this._router.currentInstruction.config.navModel.setTitle(me.document.title);
            })
            .then(() =>
            {
                // initialize editor
                let config = EditorConfig;
                config.element = document.getElementById("md-editor");
                this._editor = new SimpleMDE(config);
                // pass the document content to editor
                this._editor.value(this.document.content);
            })
            .then(() =>
            {
                // notify MDL to update components
                MDL.componentHandler.upgradeAllRegistered();
                $("#view-edit__progress").hide();
            })
            .catch((error: any) =>
            {
                console.log(error);
            });
    }
}