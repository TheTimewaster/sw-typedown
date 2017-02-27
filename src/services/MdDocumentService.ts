import "fetch";
import { HttpClient } from "aurelia-fetch-client";
import { MdDocumentList } from "data/MdDocumentList";
import { MdDocument, MdDocumentObject } from "data/MdDocument";
import ApiConf from "configs";

export class MdDocumentService
{
    private _client: HttpClient;
    private _apiUrl: string;

    constructor()
    {
        this._client = new HttpClient();
        this._apiUrl = (ApiConf.secure) ? "https" : "http" + "://" + ApiConf.host + ":" + ApiConf.port;
    }

    fetchAllDocuments(): Promise<Array<MdDocumentObject>>
    {
        let me = this;
        return new Promise<Array<MdDocumentObject>>((resolve: Function, reject: Function) =>
        {
            me._client.fetch(me._apiUrl + "/docs/get/all")
                .then((response: any) => response.json())
                .then((docList: Array<MdDocumentObject>) =>
                {
                    resolve(docList);
                });
        });
    }

    getDocument(id: number | string, save?: boolean): Promise<MdDocument>
    {
        let me = this;

        return new Promise<MdDocument>((resolve, reject) =>
        {
            if (save)
            {
                self.caches.open("md-doc-v1").then((cache) =>
                {
                    me._fetchDocumentFromServer(id).then((document: MdDocumentObject) =>
                    {
                        cache.add(this._apiUrl + "/docs/get/" + id);
                        let mdDoc = new MdDocument(document._title, document._id, document._content);
                        resolve(mdDoc);
                    });
                });
            }
            else
            {
                me._fetchDocumentFromServer(id).then((document: MdDocumentObject) =>
                {
                    let mdDoc = new MdDocument(document._title, document._id, document._content);
                    resolve(mdDoc);
                });
            }
        });
    }

    private _fetchDocumentFromServer(id): Promise<any>
    {
        return this._client
            .fetch(this._apiUrl + "/docs/get/" + id)
            .then((response: Response) => response.json());
    }
}