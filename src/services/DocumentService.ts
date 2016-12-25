import "fetch";
import { HttpClient } from "aurelia-fetch-client";
import { DocumentList } from "../data/DocumentList";
import { Promise } from "es6-promise";

export class DocumentService
{
    _client: HttpClient;

    constructor()
    {
        this._client = new HttpClient();
    }

    getFiles(): Promise<DocumentList>
    {
        let me = this;
        return new Promise<DocumentList>(function (resolve, reject)
        {
            me._client.fetch("dist/example-list.json")
                .then((response :any) => response.json())
                .then((data:any) =>
                {
                    let docList = new DocumentList(data);
                    resolve(docList);
                });
        });
    }
}