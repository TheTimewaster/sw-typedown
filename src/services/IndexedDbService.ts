import { inject } from "aurelia-framework";
import * as localForage from "localforage";
import { MdDocument, MdDocumentObject } from "data/MdDocument";

/**
* IndexedDbService
* @author Tu Hoang Thanh
*/
export class IndexedDbService
{
    private _db: LocalForage;
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
}

export default IndexedDbService;