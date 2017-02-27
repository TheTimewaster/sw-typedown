const DEFAULT_TITLE: string = "[Untitled]";
const DEFAULT_ID: number = 0;

export class MdDocument
{
    private _documentObject: MdDocumentObject;

    constructor(title: string = DEFAULT_TITLE, id: number = DEFAULT_ID, content: string = "", lastModified?: number)
    {
        this._documentObject = {
            _title: title,
            _id: id,
            _content: content,
            _lastModified: lastModified
        };
    }

    set title(title: string)
    {
        this._documentObject._title = title;
    }

    set content(content: string)
    {
        this._documentObject._content = content;
    }

    set offline(offline: boolean)
    {
        this._documentObject._offline = offline;
    }

    get id()
    {
        return this._documentObject._id;
    }

    get title()
    {
        return this._documentObject._title;
    }

    get content()
    {
        return this._documentObject._content;
    }

    updateLastModified()
    {
        this._documentObject._lastModified = new Date().getTime();
    }

    get documentObject()
    {
        return this._documentObject;
    }

    toJson(): string
    {
        return JSON.stringify(this._documentObject);
    }
}

export type MdDocumentObject = {
    _title: string
    _id: number;
    _content?: string;
    _lastModified?: number;
    _offline?: boolean

};

export default MdDocument;