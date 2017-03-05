import { inject } from "aurelia-framework";
import * as localForage from "localforage";
import "localforage-getitems";
import { MdDocument, MdDocumentObject } from "data/MdDocument";

/**
* IndexedDbService
* @author Tu Hoang Thanh
*/
export class IndexedDbService
{
    private _db;
    constructor()
    {
        // always use IndexedDb
        if (window.indexedDB)
        {
            this._db = localForage.createInstance({
                driver: localForage.INDEXEDDB,
                name: "typedown",
                version: 1.0,
                storeName: "md-documents"
            });
        }
    }

    writeDocument(key: string, documentObject: MdDocumentObject): Promise<MdDocumentObject>
    {
        return this._db.setItem(key, documentObject).then((value: MdDocumentObject) => value);
    }

    getDocument(key: string): Promise<MdDocumentObject>
    {
        return this._db.getItem(key).then((value: MdDocumentObject) => value);
    }

    checkDocumentExists(key: string): Promise<boolean>
    {
        return this._db.getItem(key).then((value: MdDocumentObject) => value !== null);
    }

    getAllDocuments(): Promise<Array<MdDocumentObject>>
    {
        return this._db.getItems().then((results: Object) =>
        {
            // results is of type object, the value of the key is a MdDocumentObject
            let ret: Array<MdDocumentObject> = new Array();
            for (let key in results)
            {
                ret.push(results[key]);
            }
            return ret;
        });
    }
}

export default IndexedDbService;