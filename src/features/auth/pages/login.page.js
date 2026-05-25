export const LoginPage = (authService, router) => {
    const el = document.createElement("article");

     el.style.cssText = "width: 90%; max-width: 500px;";

    el.innerHTML = `
        <h2 style="text-align: center">Vanilla SPA</h2>
        <form>
            <input
                type="text"
                name="username"
                autocomplete="username"
                placeholder="Usuário"
                required
            />

            <input
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="Senha"
                required
            />

            <input type="submit" value="Entrar"/>
        </form>
    `;

    const form = el.querySelector("form")

    const messageBox = document.createElement('small')
    messageBox.classList.add("pico-color-red-200")
    messageBox.hidden = true

    el.append(messageBox)

    el.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const credentials = Object.fromEntries(
            new FormData(form).entries(),
        );

        if (!authService.login(credentials.username, credentials.password)) {
            messageBox.innerText = "Credenciais inválidas"
            messageBox.hidden = false
            return;
        }

        router.navigateTo("/home");
    });

    return el;
};
