import { ButtonComponent } from "@/features/common/components/button.component.js";

export const UserListComponent = ({ users, onEdit, onViewDetails }) => {
    const el = document.createElement("div");

    if (users.length === 0) {
        el.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return el;
    }

    el.innerHTML = `
    <table class="striped">
      <thead >
        <tr >
          <th class="pico-background-slate-800" scope="col" style="width: 20%;">Nome</th>
          <th class="pico-background-slate-800" scope="col">E-mail</th>
          <th class="pico-background-slate-800" scope="col" style="width: 20%; text-align: center;">Ações</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

    const tbody = el.querySelector("tbody");

    users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row">${user.name}</th>
            <td>${user.email}</td>
            <td style="display: flex; justify-content: center; gap: 15px;">
                <a href="#" class="action-view">Detalhes</a>
                <a href="#" class="action-edit pico-color-amber">Editar</a>
            </td>
        `;

        tr.querySelector('.action-view').addEventListener('click', (event) => {
            event.preventDefault()
            onViewDetails(user.id)
        })

        tr.querySelector('.action-edit').addEventListener('click', (event) => {
            event.preventDefault()
            onEdit(user.id)
        })

        tbody.appendChild(tr);
    });

    return el;
};
