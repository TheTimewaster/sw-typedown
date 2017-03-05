import { inject, customElement } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import * as $ from "jquery";
import { MaterialSnackbar } from "material-design-lite";

/**
 * NotificationWrapper
 */
@inject(EventAggregator, Element)
@customElement("notification-wrapper")
export class NotificationWrapper
{
    private _aggregator: EventAggregator;
    private _element: Element;
    private _notificationContainer: MaterialSnackbar;

    constructor(aggregator, element)
    {
        this._aggregator = aggregator;
        this._element = element;

    }

    attached()
    {
        this._notificationContainer = $("#notification")[ 0 ] as MaterialSnackbar;
        this._aggregator.subscribe("notification", this._showNotification.bind(this));
    }

    private _showNotification = (notification: string | SnackbarData) =>
    {
        let data: SnackbarData;

        if (typeof notification === "string")
        {
            data = {
                message: notification,
                timeout: 2000
            };
        }
        if (typeof notification === "object")
        {
            data = notification;
        }

        // install notification wrapper
        this._notificationContainer.MaterialSnackbar.showSnackbar(data);
    }
}