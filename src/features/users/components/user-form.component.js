import { ButtonComponent } from "@/features/common/components/button.component.js";
import { InputGroupComponent } from "@/features/common/components/input-group.component.js";
import { SelectGroupComponent } from "@/features/common/components/select-group.component.js";

export const UserFormComponent = ({ user, onSave }) => {
    const el = document.createElement("div");
    el.style.cssText = "padding: 20px; max-width: 500px;";

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
    <div class="form-fields"></div>

    <div class="form-actions"></div>

    <dialog id="modal-warning-admin">
        <article >
            <h2>Advertência: Usuário ADMIN</h2>
            <p style="margin: 50px 0; text-align: center">
                Grandes poderes vêm com grandes responsabilidades!
            </p>
            <footer>
                <button
                    class="pico-background-amber"
                    style="border: none"
                    autofocus
                    data-target="modal-warning-admin"
                    >Eu entendi</button>
            </footer>
        </article>
    </dialog>
  `;

    const save = () => {
        if (!props.name || !props.email) {
            return alert("form vazio");
        }
        onSave(props);
    };

    const updateUI = () => {
        // regra do perfil Admin
        modalWarningAdmin.removeAttribute('open')
        if (Number(props.profile) === 1) {
            modalWarningAdmin.setAttribute('open', true)
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

    const modalWarningAdmin = el.querySelector("#modal-warning-admin");
    modalWarningAdmin.querySelector('button').addEventListener('click', () => {
        modalWarningAdmin.removeAttribute('open')
    })
    const actionsContainer = el.querySelector(".form-actions");
    actionsContainer.append(
        ButtonComponent({ child: "Salvar", onClick: save, color: "green", style: "width: 100%" }),
    );

    const init = () => {
        updateUI();
    };

    init();
    return el;
};
