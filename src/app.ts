import { inject, LogManager } from "aurelia-framework";
import { Router, RouterConfiguration, RouteConfig } from "aurelia-router";

@inject(Element, LogManager)
export class App
{
    private _element: Element;

    constructor(element: Element)
    {
        this._element = element;
    }
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.title = "Typedown";
        config.map([
            {
                route: "view/all",
                moduleId: "views/docs-overview/docs-overview",
                title: "Your Files",
                nav: true,
                name: "root"
            },
            {
                route: "view/doc/:id",
                href: "view/doc/:id",
                moduleId: "views/docs-edit/docs-edit",
                name: "doc",
                nav: true
            },
            {
                route: "",
                redirect: "view/all"
            }
        ]);

        this.router = router;
    }
}