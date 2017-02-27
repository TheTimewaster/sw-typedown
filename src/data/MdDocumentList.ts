import { MdDocumentObject } from "./MdDocument";

export class MdDocumentList<MdDocumentObject>
{
    _documentList: Array<MdDocumentObject>;
    constructor(response: Array<MdDocumentObject>)
    {
        this._documentList = response;
    }

    get documentList(): Array<MdDocumentObject>
    {
        return this._documentList;
    }
}