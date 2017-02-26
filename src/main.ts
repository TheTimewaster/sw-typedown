import "jquery";
import "material-design-lite";
import { Aurelia } from "aurelia-framework";

export function configure(aurelia: Aurelia)
{
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin("aurelia-event-aggregator");

    aurelia.start().then(() =>
        aurelia.setRoot()
    );
}