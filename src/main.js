import { container } from "@/core/container.js";
import { Router } from "./core/router.js";
import { routes } from "./config/routes.js";

const appElement = document.getElementById("app");

async function initApp() {
    const authService = await container.resolve("AuthService");

    window.router = new Router(routes, appElement, authService);
    window.router.render();
}

document.addEventListener("DOMContentLoaded", initApp);
