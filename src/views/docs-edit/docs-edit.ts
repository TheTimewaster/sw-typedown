import { inject } from "aurelia-framework";
import { Router, RouteConfig, NavigationInstruction } from "aurelia-router";
import { MdDocumentService } from "services/MdDocumentService";
import { MdDocument } from "data/MdDocument";
import * as MDL from "material-design-lite";
import * as $ from "jquery";
import * as SimpleMDE from "simplemde";
import EditorConfig from "./EditorConfig";


@inject(MdDocumentService, Element, Router)
export class DocsEdit
{
    private _docId: number;
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

    activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): Promise<any>
    {
        this._docId = params.id;
        let me = this;
        // fetch current document from service
        return this._service.getDocument(this._docId).then((mdDoc: MdDocument) =>
        {
            // parse markdown document
            me.document = mdDoc;
            // pass title
            me.newDocTitle = me.document.title;
            // set title
            routeConfig.navModel.setTitle(me.document.title);
        }).catch((error: any) =>
        {
            console.log(error);
        });
    }

    attached()
    {
        let me = this;
        // initialize config
        let config = EditorConfig;
        config.element = document.getElementById("md-editor");
        this._editor = new SimpleMDE(config);
        // pass the document content to editor
        this._editor.value(me.document.content);

        // notify MDL to update components
        MDL.componentHandler.upgradeAllRegistered();
    }
}