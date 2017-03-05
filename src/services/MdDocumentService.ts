import { inject } from "aurelia-framework";
import "fetch";
import { HttpClient, RequestInit, json } from "aurelia-fetch-client";
import { MdDocumentList } from "data/MdDocumentList";
import { MdDocument, MdDocumentObject } from "data/MdDocument";
import IndexedDbService from "./IndexedDbService";
import ApiConf from "configs";

/**
 * A ctility class for accessing and modifying documents from server and local database.
 */
@inject(IndexedDbService, HttpClient)
export class MdDocumentService
{
    private _client: HttpClient;
    private _apiUrl: string;
    private _db: IndexedDbService;

    constructor(db: IndexedDbService, client: HttpClient)
    {
        this._client = client;
        this._db = db;
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
                }).catch(() =>
                {
                    this._db.getAllDocuments().then((documents) =>
                    {
                        resolve(documents);
                    });
                });
        });
    }

    /**
     * Fetches document from Server. By setting the [save]-flag.
     * The document should be saved to local DB and the MdDocumentObject should wear the [offline] flag.
     *
     * @param {(number | string)} id
     * @param {boolean} [save]
     * @returns {Promise<MdDocument>}
     *
     * @memberOf MdDocumentService
     */
    getDocument(id: string, save?: boolean): Promise<MdDocumentObject>
    {
        let me = this;
        return new Promise<MdDocumentObject>((resolve, reject) =>
        {
            me._fetchDocumentFromServer(id)
                .then((docObject: MdDocumentObject) =>
                {
                    if (save)
                    {
                        // writing in db can happen asynchronously?
                        docObject._offline = true;
                        this._db.writeDocument(docObject._id, docObject);
                    }
                    resolve(docObject);
                })
                .catch(() =>
                {
                    this._db.getDocument(id).then((docObject) =>
                    {
                        resolve(docObject);
                    });
                });
        });
    }

    /**
     * Post document to server. When errors occur write them to local DB.
     *
     * @param {MdDocumentObject} documentObject
     * @param {boolean} save
     * @returns {Promise<any>}
     *
     * @memberOf MdDocumentService
     */
    saveDocument(documentObject: MdDocumentObject, save?: boolean): Promise<any>
    {
        return this._client.fetch(this._apiUrl + "/docs/get/" + documentObject._id, {
            method: "POST",
            body: json(documentObject)
        }).then(
            (payload) =>
            {
                /**
                 * Validate response from server.
                 * In most cases a HTTP 200 should be returned
                 * TODO: force saving to DB when "save" flag is set
                */
                let response = this._validateServerResponse(payload);
                return response;
            },
            (error) =>
            {
                /**
                 * Server errors can occur.
                 * Save to local DB instead.
                 */
                this._db.writeDocument(documentObject._id, documentObject);
                return false;
            })
            .catch((error) =>
            {
                /**
                 * Unexpected errors can occur.
                 * Save to local DB instead.
                 */
                this._db.writeDocument(documentObject._id, documentObject);
                return false;
            });
    }

    public tryPostingAllDocuments()
    {
        // fetch all documents from db flag
        // put them all in an array
        // convert array as json
        // post array to server
        // error handling -> do nothing
        // offline handling -> do nothing
        // success handling -> every document with an offline-flag should be replaced
    }

    public removeDocument(id: string)
    {
        // put remove request to server
        // error handling -> force removing from local
        // offline handling -> force removing from local
        // success handling -> force removing from local
    }

    public removeDocumentFromLocal(id: string)
    {
        // remove local document
        // error handling -> do nothing
        // success handling -> do nothing
    }

    public checkDocumentIsLocal(id: string): Promise<boolean>
    {
        return this._db.checkDocumentExists(id);
    }

    /**
     * A wrapper for generally fetch a specific document from server
     *
     * @private
     * @param {any} id
     * @returns {Promise<any>}
     *
     * @memberOf MdDocumentService
     */
    private _fetchDocumentFromServer(id): Promise<any>
    {
        return this._client
            .fetch(this._apiUrl + "/docs/get/" + id)
            .then((response: Response) => response.json());
    }

    private _validateServerResponse(payload: any): string | boolean
    {
        // TODO: implement
        return true;
    }
}