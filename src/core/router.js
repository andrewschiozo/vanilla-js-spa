export class Router {
    constructor(routes, rootElement, authService) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.authService = authService;
        this.currentRoute = window.location.hash;

        window.addEventListener("hashchange", () => this.render());
    }

    navigateTo(hashPath) {
        window.location.hash = hashPath;
    }

    _matchRoute(currentHash) {
        for (const routePath in this.routes) {
            const paramNames = [];
            //trata rotas com parametros variáveis (ex: user/:id/editar)
            const regexPath =
                routePath.replace(/:([^/]+)/g, (_, name) => {
                    paramNames.push(name);
                    return "([^/]+)";
                }) + "$";

            const match = currentHash.match(new RegExp(regexPath));
            if (match) {
                const params = {};
                paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
                return { route: this.routes[routePath], params };
            }
        }
        return null;
    }

    async render() {
        const currentHash = window.location.hash.slice(1) || "/login";
        const match = this._matchRoute(currentHash);

        this.currentRoute = currentHash;

        if (!match) {
            this.navigateTo("/login");
            return;
        }

        const { route, params } = match;
        const isLogged = this.authService.isAuthenticated();

        if (route.auth && !isLogged) {
            this.navigateTo("/login");
            return;
        }
        if (!route.auth && isLogged && currentHash === "/login") {
            this.navigateTo("/home");
            return;
        }

        // loader entre troca de páginas
        const loadingEl = document.createElement("div");
        loadingEl.style.cssText =
            "padding: 20px; font-family: sans-serif; color: #7f8c8d;";
        loadingEl.innerText = "Carregando página...";

        this.rootElement.innerHTML = "";
        this.rootElement.appendChild(loadingEl);

        try {
            const viewElement = await route.view(params);
            const fullLayoutElement = route.layout(
                viewElement,
                this.authService,
                this,
            );

            // remove o loader
            this.rootElement.innerHTML = "";
            this.rootElement.appendChild(fullLayoutElement);
        } catch (error) {
            console.error("Erro ao carregar a página:", error);
            this.rootElement.innerHTML =
                '<div style="padding:20px;">Erro ao carregar a página.</div>';
        }
    }
}
