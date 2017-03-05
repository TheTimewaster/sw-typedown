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

        self.onactivate = function(event)
        {
            console.log("activate");
        };

        self.oninstall = function(event)
        {
            console.log("oninstall");
        };
    }

    public serviceWorkerSupported(): boolean
    {
        return ("serviceWorker" in navigator) ? true : false;
    }

    public installServiceWorker(): Promise<boolean>
    {
        return navigator.serviceWorker.register("/typedown-worker.js").then((registration: ServiceWorkerRegistration) =>
        {
            // registration was successful
            let notification: SnackbarData = {
                message: "Worker install successful. Refresh application to complete installation.",
                timeout: 30000,
                actionHandler: function ()
                {
                    location.reload();
                },
                actionText: "refresh"
            };

            this._aggregator.publish("notification", notification);
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
            if (registration.active.state === "activated")
            {
                this._aggregator.publish("notification", "Worker running.");
                return true;
            }
            return false;
        });
    }
}

export default ServiceWorkerInstaller;