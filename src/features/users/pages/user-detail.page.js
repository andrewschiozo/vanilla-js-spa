export const UserDetailPage = (userService, router, id) => {
    const el = document.createElement("div");
    const user = userService.getById(id);

    if (!user) {
        el.innerHTML = `<p>Usuário ${id} não encontrado.</p>`;
        return el;
    }

    el.innerHTML = `
        <div style="display: flex; justify-content: end;">
            <button id="back-btn" style="border: none; padding: 10px 15px">Voltar para a Lista</button>
        </div>
        
        <h1 style="text-align: center">${user.name}</h1>
        <hr />
    
    <div style="padding: 25px; max-width: 500px;">
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Nome Completo:</strong> ${user.name}</p>
      <p><strong>E-mail de Contato:</strong> ${user.email}</p>
      <p><strong>Perfil:</strong> ${user.profile}</p>
    </div>
  `;

    el.querySelector("#back-btn").addEventListener("click", () => {
        router.navigateTo("/usuarios");
    });

    return el;
};
