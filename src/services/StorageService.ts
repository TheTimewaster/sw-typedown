export class StorageService
{
    private _storage: Storage;

    constructor()
    {
        this._initStorageService();
    }

    private _initStorageService()
    {
        this._storage = window.localStorage;
    }

    public write(key: string, value: string | boolean | number): void
    {
        this._storage.setItem(key, value.toString());
    }

    public clearStorage(): void
    {
        this._storage.clear();
    }

    public get(key: string): string
    {
        return this._storage.getItem(key);
    }
}

export default StorageService;