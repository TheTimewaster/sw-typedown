import { inject, customElement, ComponentAttached } from "aurelia-framework";
import { SettingsService } from "services/SettingsService";
import { ServiceWorkerInstaller } from "services/ServiceWorkerInstaller";
import * as dialogPolyfill from "dialog-polyfill";
import * as $ from "jquery";

@inject(SettingsService, Element, ServiceWorkerInstaller)
@customElement("enable-worker-dialog")
export class EnableWorkerDialog implements ComponentAttached
{
    private _settingsService: SettingsService;
    private _element: Element;
    private _dialog: HTMLDialogElement;
    private _workerInstaller: ServiceWorkerInstaller;

    constructor(settings: SettingsService, element: Element, installer: ServiceWorkerInstaller)
    {
        this._settingsService = settings;
        this._element = element;
        this._workerInstaller = installer;
    }

    attached()
    {
        if (this._workerInstaller.serviceWorkerSupported())
        {
            // user setting for service worker not set
            if (this._settingsService.getUseServiceWorker() === null)
            {
                this._dialog = $(this._element).find("#enable-worker-dialog")[ 0 ] as HTMLDialogElement;
                dialogPolyfill.registerDialog(this._dialog);
                this._dialog.showModal();
            }
            // user setting for service worker is set on true
            else if (this._settingsService.getUseServiceWorker() === true)
            {
                this._workerInstaller.getServiceWorkerRunning(true);
            }
        }
    }

    private aggreeButtonClicked()
    {
        this._workerInstaller.installServiceWorker().then(() =>
        {
            this._settingsService.setUseServiceWorker(true);
            this._dialog.close();
        });
    }

    private disagreeButtonClicked()
    {
        this._settingsService.setUseServiceWorker(false);
        this._dialog.close();
    }
}