export class MdDocumentList
{
    _documentList: Array<Object>;
    constructor(response: Array<Object>)
    {
        this._documentList = response;
    }

    get documentList(): Array<Object>
    {
        return this._documentList;
    }
}