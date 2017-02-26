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

    private _showNotification(message: string)
    {
        let data: SnackbarData = {
            message: message,
            timeout: 2000
        };

        // install notification wrapper
        this._notificationContainer.MaterialSnackbar.showSnackbar(data);
    }
}