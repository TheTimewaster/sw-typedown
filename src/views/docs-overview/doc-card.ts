import { bindable, inject, bindingMode, customElement } from "aurelia-framework";
import { MdDocument, MdDocumentObject } from "data/MdDocument";
import { MdDocumentService } from "services/MdDocumentService";
import * as MDL from "material-design-lite";

@inject(Element, MdDocumentService)
@customElement("doc-card")
export class DocCard
{
    @bindable({ defaultBindingMode: bindingMode.oneWay }) docInfo: MdDocumentObject;

    private _element: Element;
    private _docService: MdDocumentService;
    private _document: MdDocument;

    constructor(element: Element, docService: MdDocumentService)
    {
        this._element = element;
        this._docService = docService;
    }

    bind()
    {
        this._document = new MdDocument(this.docInfo._title, this.docInfo._id, this.docInfo._lastModified);

        // check if document is saved locally
        this._docService.checkDocumentIsLocal(this.docInfo._id).then((isOffline) =>
        {
            this._document.offline = isOffline;
        });
    }

    attached()
    {
        // update componentHandler for MDL
        MDL.componentHandler.upgradeElement(this._element);
    }

    serveDocumentOffline()
    {
        this._docService.getDocument(this._document.id, true).then((doc) =>
        {
            // for reprensation
            this._document.offline = true;
        });
    }
}