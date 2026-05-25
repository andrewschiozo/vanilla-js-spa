import { UserListComponent } from "@/features/users/components/user-list.component.js";
import { UserFormComponent } from "@/features/users/components/user-form.component.js";
import { ButtonComponent } from "@/features/common/components/button.component.js";

export const UserManagerPage = (userService, router, editId = null) => {
    const container = document.createElement("div");
    const props = new Proxy({
            title: "Usuários"
        },
        {
            set(target, property, value, receiver) {
                const success = Reflect.set(target, property, value, receiver);
                if (success) {
                    container.querySelector('#page-title').textContent = value
                }
                return success;
            },
        },
    );
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
            <h1 id="page-title">${props.title}</h1>
        
            <slot id="user-action-bar"></slot>
        </div>
        <hr />
  
        <slot id="user-list"></slot>
        <slot id="user-form"></slot>
    `;


    const actionBar = container.querySelector("#user-action-bar");
    actionBar.append(
        ButtonComponent({
            child: "+ Novo Usuário",
            onClick: () => router.navigateTo("/usuario/novo"),
            color: "green",
        }),
    );

    const userList = container.querySelector("#user-list");
    const userForm = container.querySelector("#user-form");

    const actions = {
        resetPage: () => {
            actionBar.hidden = true;
            userList.hidden = true;
            userForm.hidden = true;

            userList.innerHTML = "";
            userForm.innerHTML = "";
        },
        showList: () => {
            actions.resetPage();
            props.title = "Usuários"
            userList.append(
                UserListComponent({
                    users: userService.getAll(),
                    onEdit: (id) => router.navigateTo(`/usuario/${id}/editar`),
                    onViewDetails: (id) => router.navigateTo(`/usuario/${id}`),
                }),
            );
            actionBar.hidden = false;
            userList.hidden = false;
        },
        showNewForm: () => {
            actions.resetPage();
            props.title = "Novo usuário"
            userForm.append(
                UserFormComponent({
                    user: null,
                    onSave: (formData) => {
                        userService.save(formData);
                        router.navigateTo("/usuarios");
                    }
                }),
            );
            userForm.hidden = false;
        },
        showEditForm: (editId) => {
            actions.resetPage();
            props.title = "Editar usuário"
            const userToEdit = userService.getById(editId);

            if (!userToEdit) {
                alert("usuario nao encontrado");
                router.navigateTo("/usuarios");
            }

            userForm.append(
                UserFormComponent({
                    user: userToEdit,
                    onSave: (formData) => {
                        userService.save(formData);
                        router.navigateTo("/usuarios");
                    }
                }),
            );

            userForm.hidden = false;
        },
    };

    const init = () => {
        if (editId) {
            actions.showEditForm(editId);
            return;
        }

        if (router.currentRoute.includes("/novo")) {
            actions.showNewForm();
            return;
        }
        actions.showList();
    };

    init();

    return container;
};
