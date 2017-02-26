import { inject, customElement, ComponentAttached } from "aurelia-framework";
import { SettingsService } from "services/SettingsService";
import * as dialogPolyfill from "dialog-polyfill";
import * as $ from "jquery";

@inject(SettingsService, Element)
@customElement("enable-worker-dialog")
export class EnableWorkerDialog implements ComponentAttached
{
    private _settingsService: SettingsService;
    private _element: Element;
    private _dialog: HTMLDialogElement;

    constructor(settings: SettingsService, element: Element)
    {
        this._settingsService = settings;
        this._element = element;
    }

    attached()
    {
        if (this._settingsService.getUseServiceWorker() === undefined)
        {
            this._dialog = $(this._element).find("#enable-worker-dialog")[0] as HTMLDialogElement;
            dialogPolyfill.registerDialog(this._dialog);
            this._dialog.showModal();
        }
    }

    aggreeButtonClicked()
    {
        this._settingsService.setUseServiceWorker(true);
        this._dialog.close();
    }

    disagreeButtonClicked()
    {
        this._settingsService.setUseServiceWorker(false);
        this._dialog.close();
    }
}