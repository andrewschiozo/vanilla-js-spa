import { container } from "@/core/container.js";

const appElement = document.getElementById("app");

async function initApp() {
    console.log("vanilla js");
    const storage = await container.resolve("StorageAdapter");
    console.log(storage);
}

document.addEventListener("DOMContentLoaded", initApp);
