import { PrivateLayout } from "@/core/layouts/private.layout.js";
import { PublicLayout } from "@/core/layouts/public.layout.js";
import { container } from "@/core/container.js";

export const routes = {
    "/login": {
        view: async () => {
            const authService = await container.resolve("AuthService");
            const { LoginPage } =
                await import("@/features/auth/pages/login.page.js");
            return LoginPage(authService, window.router);
        },
        layout: PublicLayout,
        auth: false,
    },
    "/home": {
        view: async () => {
            const { HomePage } =
                await import("@/features/home/pages/home.page.js");
            return HomePage();
        },
        layout: PrivateLayout,
        auth: true,
    },
};
