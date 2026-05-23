export class UsersService {
    constructor(storageAdapter) {
        this.storage = storageAdapter;
        this.sessionKey = "user";
        this.listKey = "list";

        // mock de dados
        if (!this.storage.get(this.listKey)) {
            this.storage.set(this.listKey, [
                {
                    id: "123",
                    name: "Andrews Chiozo",
                    email: "ac@email.com",
                    profile: 1,
                },
                {
                    id: "456",
                    name: "João Vicente",
                    email: "jv@email.com",
                    profile: 2,
                },
            ]);
        }
    }

    getAll() {
        return this.storage.get(this.listKey) || [];
    }

    getById(id) {
        return this.getAll().find((u) => u.id === id) || null;
    }

    save(userObj) {
        userObj.id ? this.update(userObj) : this.create(userObj);
    }

    create(userObj) {
        const list = this.getAll();
        userObj.id = String(Date.now());
        list.push(userObj);
        this.storage.set(this.listKey, list);
    }

    update(userObj) {
        const list = this.getAll();
        const index = list.findIndex((u) => u.id === userObj.id);
        if (index !== -1) {
            list[index] = userObj;
        }
        this.storage.set(this.listKey, list);
    }
}
