class DIContainer {
    constructor() {
        this.instances = new Map();
        this.factories = new Map();
    }

    // registra a fábrica do serviço (lazy load)
    register(name, factoryFn) {
        this.factories.set(name, factoryFn);
    }

    async resolve(name) {
        if (this.instances.has(name)) {
            return this.instances.get(name);
        }

        const factory = this.factories.get(name);
        if (!factory) {
            throw new Error(`Serviço '${name}' não registrado.`);
        }

        const instance = await factory(this);
        this.instances.set(name, instance);
        return instance;
    }
}

export const container = new DIContainer();

container.register("StorageAdapter", async () => {
    const { LocalStorageStoreAdapter } =
        await import("@/core/adapters/local-storage.adapter.js");
    return new LocalStorageStoreAdapter("app");
});

container.register("AuthService", async (c) => {
    const storage = await c.resolve("StorageAdapter");
    const { AuthService } =
        await import("@/features/auth/services/auth.service.js");
    return new AuthService(storage);
});

container.register("UsersService", async (c) => {
    const storage = await c.resolve("StorageAdapter");
    const { UsersService } =
        await import("@/features/users/services/users.service.js");
    return new UsersService(storage);
});
