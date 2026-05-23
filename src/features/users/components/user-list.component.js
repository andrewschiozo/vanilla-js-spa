import { ButtonComponent } from "@/features/common/components/button.component.js";

export const UserListComponent = ({ users, onEdit, onViewDetails }) => {
    const el = document.createElement("div");

    if (users.length === 0) {
        el.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return el;
    }

    el.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background: #34495e; color: white; text-align: left;">
          <th style="width: 20%; padding: 12px;">Nome</th>
          <th style="padding: 12px;">E-mail</th>
          <th style="width: 20%; padding: 12px; text-align: center;">Ações</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

    const tbody = el.querySelector("tbody");

    users.forEach((user) => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid #ddd";
        tr.innerHTML = `
      <td style="padding: 8px 12px;">${user.name}</td>
      <td style="padding: 8px 12px;">${user.email}</td>
      <td style="padding: 8px 12px; display: flex; justify-content: center; gap: 5px;" class="user-list-actions"></td>
    `;

        tr.querySelector(".user-list-actions").append(
            ButtonComponent({
                child: "Detalhes",
                onClick: () => onViewDetails(user.id),
                color: "info",
                size: "small",
            }),
            ButtonComponent({
                child: "Editar",
                onClick: () => onEdit(user.id),
                color: "warning",
                size: "small",
            }),
        );

        tbody.appendChild(tr);
    });

    return el;
};
