import { inject, LogManager } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

/**
 * ServiceWorkerInstaller
 */
@inject(EventAggregator)
export class ServiceWorkerInstaller
{
    private _aggregator: EventAggregator;
    private _serviceWorker: ServiceWorker;

    constructor(aggregator: EventAggregator)
    {
        this._aggregator = aggregator;
    }

    public serviceWorkerSupported(): boolean
    {
        return ("serviceWorker" in navigator) ? true : false;
    }

    public installServiceWorker(): Promise<boolean>
    {
        return navigator.serviceWorker.register("/dist/worker/TypedownWorker.js").then((registration: ServiceWorkerRegistration) =>
        {
            // registration was successful
            this._aggregator.publish("notification", "Worker installed successfully.");
            return true;
        }).catch((error) =>
        {
            // registration failed
            this._aggregator.publish("notification", "Worker install failed. :(");
        });
    }

    public getServiceWorkerRunning(notify: boolean = false): Promise<boolean>
    {
        return navigator.serviceWorker.ready.then((registration) =>
        {
            console.log(registration.active.state);
            return false;
        });
    }
}

export default ServiceWorkerInstaller;