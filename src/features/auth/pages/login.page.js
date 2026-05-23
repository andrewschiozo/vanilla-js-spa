export const LoginPage = (authService, router) => {
    const el = document.createElement("div");
    el.style.cssText =
        "background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 300px;";

    el.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 20px;">Vanilla SPA</h2>
        <form>
            <div style="margin-bottom: 15px;">
                <input type="text" name="username" autocomplete="username" placeholder="Usuário" style="width: 100%; padding: 10px; box-sizing: border-box;" />
            </div>
            <div style="margin-bottom: 20px;">
                <input type="password" name="password" autocomplete="current-password" placeholder="Senha" style="width: 100%; padding: 10px; box-sizing: border-box;" />
            </div>
            <button type="submit" style="width: 100%; padding: 10px; background: #2ecc71; color: white; border: none; font-size: 16px; cursor: pointer; border-radius: 4px;">Entrar</button>
        </form>
    `;

    el.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const credentials = Object.fromEntries(
            new FormData(document.querySelector("form")).entries(),
        );

        if (!authService.login(credentials.username, credentials.password)) {
            alert("Credenciais inválidas!");
            return;
        }

        router.navigateTo("/home");
    });

    return el;
};
