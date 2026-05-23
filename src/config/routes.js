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
    "/usuarios": {
        view: async () => {
            const usersService = await container.resolve("UsersService");
            const { UserManagerPage } =
                await import("@/features/users/pages/user-manager.page.js");
            return UserManagerPage(usersService, window.router);
        },
        layout: PrivateLayout,
        auth: true,
    },
    "/usuario/novo": {
        view: async (params) => {
            const usersService = await container.resolve("UsersService");
            const { UserManagerPage } =
                await import("@/features/users/pages/user-manager.page.js");
            return UserManagerPage(usersService, window.router, params.id);
        },
        layout: PrivateLayout,
        auth: true,
    },
    "/usuario/:id": {
        view: async (params) => {
            const usersService = await container.resolve("UsersService");
            const { UserDetailPage } =
                await import("@/features/users/pages/user-detail.page.js");
            return UserDetailPage(usersService, window.router, params.id);
        },
        layout: PrivateLayout,
        auth: true,
    },
    "/usuario/:id/editar": {
        view: async (params) => {
            const usersService = await container.resolve("UsersService");
            const { UserManagerPage } =
                await import("@/features/users/pages/user-manager.page.js");
            return UserManagerPage(usersService, window.router, params.id);
        },
        layout: PrivateLayout,
        auth: true,
    },
};
