import { Router, RouterConfiguration, RouteConfig } from "aurelia-router";

export class App
{
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.title = "Typedown";
        config.map([
            { route: "view/all", moduleId: "views/docs-overview/docs-overview", title: "Your Files", nav: true },
            { route: "view/doc/:id", moduleId: "views/docs-edit/docs-edit", name: "File" },
            { route: "", redirect: "view/all" }
        ]);

        this.router = router;
    }
}