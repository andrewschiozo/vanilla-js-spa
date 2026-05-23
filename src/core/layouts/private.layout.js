/**
 * @param {HTMLElement} contentEl
 * @param {import('@/features/auth/services/auth.service').AuthService} authService Serviço de autenticação
 * @param {import('@/core/router.js').Router} router O roteador do app
 * @returns {HTMLElement}
 */
export const PrivateLayout = (contentEl, authService, router) => {
    const el = document.createElement("section");
    el.className = "private-layout";
    el.style.cssText =
        "display: flex; min-height: 100vh; font-family: sans-serif;";

    el.innerHTML = `
        <aside style="width: 200px; background: #2c3e50; color: white; padding: 20px;">
            <h2>Vanilla Js</h2>
            <nav style="display: flex; flex-direction: column; gap: 15px; margin-top: 30px;">
                <a href="#/home" style="color: white; text-decoration: none;">Home</a>
                <a href="#/usuarios" style="color: white; text-decoration: none;">Usuários</a>
            </nav>

            <div style="position: fixed; bottom: 0; margin-bottom: 10px">
                <a href="#meu-perfil" style="color: #ccc; font-size: small; text-decoration: none">🦉${authService.user().name}</a>
                <button id="logout-btn" style="background: #e74c3c; color: white; border: none; padding: 8px; width: 100%; cursor: pointer; border-radius: 4px; margin-top: 10px">Sair</button>
            </div>
        </aside>
        <main style="flex: 1; padding: 30px; background: #ecf0f1;"></main>
    `;

    el.querySelector("#logout-btn").addEventListener("click", () => {
        authService.logout();
        router.navigateTo("/login");
    });

    el.querySelector("main").appendChild(contentEl);
    return el;
};
