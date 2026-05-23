import { ButtonComponent } from "@/features/common/components/button.component.js";
import { InputGroupComponent } from "@/features/common/components/input-group.component.js";
import { SelectGroupComponent } from "@/features/common/components/select-group.component.js";

export const UserFormComponent = ({ user, onSave, onCancel }) => {
    const el = document.createElement("div");
    el.setAttribute("data-component", "UserFormComponent");
    el.style.cssText =
        "background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 400px;";

    const props = {
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        profile: user?.profile || "",
    };

    const profiles = [
        { label: "Admin", value: 1 },
        { label: "User", value: 2 },
    ];

    el.innerHTML = `
    <h3>${props.id ? "Editar Usuário" : "Novo Usuário"}</h3>
    
    <div class="form-fields"></div>
    
    <div class="form-actions" style="display: flex; justify-content: start; gap: 5px; margin-top: 15px;"></div>
  `;

    const save = () => {
        if (!props.name || !props.email) {
            return alert("form vazio");
        }
        onSave(props);
    };

    const fieldsContainer = el.querySelector(".form-fields");
    fieldsContainer.append(
        InputGroupComponent({
            label: "Nome",
            type: "text",
            value: props.name,
            onInput: (val) => (props.name = val),
        }),
        InputGroupComponent({
            label: "E-mail",
            type: "email",
            value: props.email,
            onInput: (val) => (props.email = val),
        }),
        SelectGroupComponent({
            label: "Perfil",
            options: profiles,
            selected: props.profile,
            onChange: (val) => (props.profile = val),
        }),
    );

    const actionsContainer = el.querySelector(".form-actions");
    actionsContainer.append(
        ButtonComponent({ child: "Salvar", onClick: save, color: "success" }),
        ButtonComponent({ child: "Cancelar", onClick: onCancel }),
    );

    return el;
};
