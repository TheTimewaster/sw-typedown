import { inject, valueConverter, ValueConverter } from "aurelia-framework";

/**
 * An Aurelia based converter for converting long numbers to date
 *
* DateConverter
* @author Tu Hoang Thanh
*/
@valueConverter("date")
export class DateFormatValueConverter
{
    toView(value: number)
    {
        return Intl.DateTimeFormat("de-DE", {
            year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"
        }).format(value);
    }
}