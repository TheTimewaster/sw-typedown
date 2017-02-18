import { inject, customElement } from "aurelia-framework"
import { Router } from "aurelia-router";
import * as MDL from "material-design-lite";

@inject(Router)
@customElement("app-header")
export class AppHeader
{
    private _router: Router;

    constructor(router: Router)
    {
        this._router = router;
    }

    attached()
    {
        MDL.componentHandler.upgradeAllRegistered();
    }

}