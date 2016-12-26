const DEFAULT_TITLE:string = "[Untitled]";
const DEFAULT_ID:number = 0;

export class MdDocument
{
    private _title: string;
    private _id: number;
    private _content :string;
    private _lastModified: Date;

    constructor(title:string = DEFAULT_TITLE, id:number = DEFAULT_ID, content:string = "" )
    {
        this._title = title;
        this._id = id;
        this._content = content;
        this._lastModified = new Date();
    }

    set id(id: number)
    {
        this._id = id;
    }

    set title(title:string)
    {
        this._title = title;
    }

    get title()
    {
        return this._title;
    }

    get content()
    {
        return this._content;
    }

    updateLastModified()
    {
        this._lastModified = new Date();
    }

    toRawObject():Object
    {
        return {
            id: this._id,
            title: this._title,
            lastModified: this._lastModified,
            content: this._content
        };
    }

    toJson():string
    {
        return JSON.stringify(this.toRawObject());
    }
}