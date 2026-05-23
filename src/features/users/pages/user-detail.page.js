export const UserDetailPage = (userService, router, id) => {
    const el = document.createElement("div");
    const user = userService.getById(id);

    if (!user) {
        el.innerHTML = `<p>Usuário ${id} não encontrado.</p>`;
        return el;
    }

    el.innerHTML = `
    <h1>Detalhes do Usuário</h1>
    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 400px;">
      <p><strong>ID Interno:</strong> ${user.id}</p>
      <p><strong>Nome Completo:</strong> ${user.name}</p>
      <p><strong>E-mail de Contato:</strong> ${user.email}</p>
      <p><strong>Perfil:</strong> ${user.profile}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
      <button id="back-btn" style="background: #34495e; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px;">Voltar para a Lista</button>
    </div>
  `;

    el.querySelector("#back-btn").addEventListener("click", () => {
        router.navigateTo("/usuarios");
    });

    return el;
};
