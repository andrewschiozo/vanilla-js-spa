export class AuthService {
    constructor(storageAdapter) {
        this.storage = storageAdapter;
        this.sessionKey = "auth";
    }

    isAuthenticated() {
        const session = this.storage.get(this.sessionKey);
        return !!(session && session.loggedIn);
    }

    user() {
        return this.storage.get(this.sessionKey);
    }

    login(username, password) {
        if (username === "admin" && password === "123") {
            this.storage.set(this.sessionKey, {
                loggedIn: true,
                name: "Administrador",
            });
            return true;
        }
        return false;
    }

    logout() {
        this.storage.delete(this.sessionKey);
    }
}
