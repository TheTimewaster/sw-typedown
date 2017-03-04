const DEFAULT_TITLE: string = "[Untitled]";
const DEFAULT_ID: number = 0;

export class MdDocument
{
    private _documentObject: MdDocumentObject;

    constructor(title: string = DEFAULT_TITLE, id: string, lastModified?: number, content: string = "")
    {
        this._documentObject = {
            _title: title,
            _id: (id) ? id : new Date().getTime().toString(),
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

    get id(): string
    {
        return this._documentObject._id as string;
    }

    get title()
    {
        return this._documentObject._title;
    }

    get content()
    {
        return this._documentObject._content;
    }

    get offline()
    {
        return this._documentObject._offline;
    }

    get lastModified()
    {
        return this._documentObject._lastModified;
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
    _id: string;
    _content?: string;
    _lastModified?: number;
    _offline?: boolean

};

export default MdDocument;