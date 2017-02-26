import { inject } from "aurelia-framework";
import StorageService from "./StorageService";

const SETTINGS_KEY: string = "settings";
@inject(StorageService)
export class SettingsService
{
    private _settings: {
        useServiceWorker: (boolean | null);
    };

    private _storageService: StorageService;
    constructor(storage: StorageService)
    {
        this._storageService = storage;
        this._settings = {
            useServiceWorker: null
        };

        this._tryRetrievingSettings();
    }
    /**
     * This method tries to retrieve settings from Local Storage on startup of application.
     * @returns void
     * @param none
     */
    private _tryRetrievingSettings(): void
    {
        // retrieve settings
        let value = this._storageService.get(SETTINGS_KEY);
        // if value is valid, then assign _settings member
        if (value)
        {
            this._settings = JSON.parse(value);
        }
        // if nothing found, then write inital settings from constructor
        else
        {
            this._storageService.write(SETTINGS_KEY, JSON.stringify(this._settings));
        }
    }

    /**
     * This method sets the useServiceWorker property of settings and writes the settings to Local Storage.
     *
     * @param useServiceWorker: boolean
     *
     * @return void
     *
     * @memberOf SettingsService
     */
    public setUseServiceWorker(useServiceWorker: boolean): void
    {
        this._settings.useServiceWorker = useServiceWorker;
        this._storageService.write(SETTINGS_KEY, JSON.stringify(this._settings));
    }

    /**
     * This method return the *useServiceWorker* of *_settings* member
     *
     * @returns {((boolean | null))}
     *
     * @memberOf SettingsService
     */
    public getUseServiceWorker(): (boolean | null)
    {
        return this._settings.useServiceWorker;
    }
}