import { StoragePort } from "@/core/ports/storage.port.js";

export class LocalStorageStoreAdapter extends StoragePort {
    constructor(prefix = "app") {
        super();
        this.prefix = prefix;
        this.listeners = new Map();
    }

    _buildKey(featureKey) {
        return `${this.prefix}.${featureKey}`;
    }

    get(featureKey) {
        const data = localStorage.getItem(this._buildKey(featureKey));
        return data ? JSON.parse(data) : null;
    }

    set(featureKey, value) {
        localStorage.setItem(this._buildKey(featureKey), JSON.stringify(value));
        if (this.listeners.has(featureKey)) {
            this.listeners
                .get(featureKey)
                .forEach((listener) => listener(value));
        }
    }

    delete(featureKey) {
        localStorage.removeItem(this._buildKey(featureKey));
        if (this.listeners.has(featureKey)) {
            this.listeners
                .get(featureKey)
                .forEach((listener) => listener(null));
        }
    }

    subscribe(featureKey, listener) {
        if (!this.listeners.has(featureKey))
            this.listeners.set(featureKey, new Set());
        this.listeners.get(featureKey).add(listener);
        return () => this.listeners.get(featureKey).delete(listener);
    }
}
