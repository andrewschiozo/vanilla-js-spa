/**
 * @param {HTMLElement} contentEl
 * @param {import('@/features/auth/services/auth.service').AuthService} authService Serviço de autenticação
 * @param {import('@/core/router.js').Router} router O roteador do app
 * @returns {HTMLElement}
 */
export const PrivateLayout = (contentEl, authService, router) => {
    const el = document.createElement("section");
    el.className = "private-layout";
    el.style.cssText = "display: flex; min-height: 100vh; margin-bottom: 0";

    el.innerHTML = `
        <aside style="width: 200px; padding: 20px;">
            <h2 class="pico-color-sand">Vanilla Js</h2>

            <nav style="display: flex; flex-direction: column; gap: 15px;">
                <a href="#/home">Home</a>
                <a href="#/usuarios">Usuários</a>
            </nav>

            <small style="position: fixed; bottom: 0; margin-bottom: 10px; display: flex; flex-direction: column">
                <a href="#meu-perfil">${authService.user().name} (perfil)</a>
                <a href="#" id="logout-btn" class="pico-color-amber-300">Sair</a>
            </small>
        </aside>
        <main style="flex: 1; padding: 30px;" class="pico-background-slate-900"></main>
    `;

    // joga o style no head
    const style = document.createElement('style');
    style.innerHTML = `.private-layout aside a { text-decoration: none}`;
    document.head.appendChild(style);

    // current page link
    const currentPageLink = el.querySelector(`[href="#${router.currentRoute}"]`)
    if (currentPageLink) {
        el.querySelector('[aria-current="page"')?.removeAttribute('aria-current')
        currentPageLink.setAttribute('aria-current', 'page')
    }

    el.querySelector("#logout-btn").addEventListener("click", () => {
        authService.logout();
        router.navigateTo("/login");
    });

    el.querySelector("main").appendChild(contentEl);
    return el;
};
