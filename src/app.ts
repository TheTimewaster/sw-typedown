import { Router, RouterConfiguration, RouteConfig } from 'aurelia-router';

export class App
{
    router: Router;
    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.title = "Typedown"
        var conf: RouteConfig
        config.map([
            { route: "", moduleId: "views/docs-overview/docs-overview", title: "Your Files" },
            { route: "view/all", moduleId: "views/docs-overview/docs-overview", title: "Your Files" },
            { route: "view/doc:id", moduleId: "views/docs-edit/docs-edit", name: "File" }
        ]);

        this.router = router;
    }
}