import "fetch";
import { HttpClient } from "aurelia-fetch-client";
import { MdDocumentList } from "data/MdDocumentList";
import { MdDocument } from "data/MdDocument";
import ApiConf from "configs";

export class MdDocumentService
{
    private _client: HttpClient;

    constructor()
    {
        this._client = new HttpClient();
    }

    fetchAllDocuments(): Promise<MdDocumentList>
    {
        let me = this;
        return new Promise<MdDocumentList>(function (resolve: Function, reject: Function)
        {
            me._client.fetch("dist/services/example-list.json")
                .then((response: any) => response.json())
                .then((data: any) =>
                {
                    let docList = new MdDocumentList(data);
                    resolve(docList);
                });
        });
    }

    getDocument(id: number | string): Promise<MdDocument>
    {
        let me = this;
        return new Promise<MdDocument>((resolve, reject) =>
        {
            me._client.fetch("dist/services/example-doc.json")
                .then((response: any) => response.json())
                .then((data: any) =>
                {
                    let mdDoc = new MdDocument(data.title, data.id, data.content);
                    resolve(mdDoc);
                });
        });
    }
}