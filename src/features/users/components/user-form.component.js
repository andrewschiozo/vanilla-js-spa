import { ButtonComponent } from "@/features/common/components/button.component.js";
import { InputGroupComponent } from "@/features/common/components/input-group.component.js";
import { SelectGroupComponent } from "@/features/common/components/select-group.component.js";

export const UserFormComponent = ({ user, onSave, onCancel }) => {
    const el = document.createElement("div");
    el.style.cssText =
        "background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 400px;";

    const props = new Proxy({
            id: user?.id || "",
            name: user?.name || "",
            email: user?.email || "",
            profile: user?.profile || 2,
        },
        {
            set(target, property, value, receiver) {
                const success = Reflect.set(target, property, value, receiver);
                if (success) {
                    updateUI();
                }
                return success;
            },
        },
    );

    const profiles = [
        { label: "Admin", value: 1 },
        { label: "User", value: 2 },
    ];

    el.innerHTML = `
    <h3>${props.id ? "Editar Usuário" : "Novo Usuário"}</h3>
    
    <div class="form-fields"></div>

    <div id="admin-warning"></div>
    
    <div class="form-actions"></div>
  `;

    const save = () => {
        if (!props.name || !props.email) {
            return alert("form vazio");
        }
        onSave(props);
    };

    const updateUI = () => {
        // Regra do Perfil Admin
        adminWarningEl.style.display = "none";
        if (Number(props.profile) === 1) {
            adminWarningEl.style.display = "block";
            adminWarningEl.textContent = "Grandes poderes vêm com grandes responsabilidades."
        }
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

    const adminWarningEl = el.querySelector("#admin-warning");
    adminWarningEl.style.cssText = "margin-top: 15px; padding: 10px; background: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: 4px; font-size: 14px; font-weight: bold;"

    const actionsContainer = el.querySelector(".form-actions");
    actionsContainer.style.cssText = "display: flex; justify-content: start; gap: 5px; margin-top: 15px;"
    actionsContainer.append(
        ButtonComponent({ child: "Salvar", onClick: save, color: "success" }),
        ButtonComponent({ child: "Cancelar", onClick: onCancel }),
    );

    const init = () => {
        updateUI();
    };

    init();
    return el;
};
