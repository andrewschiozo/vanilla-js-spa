export const InputGroupComponent = ({ label, type, value, onInput }) => {
    const el = document.createElement("div");
    el.style.cssText = "margin-bottom: 15px;";

    el.innerHTML = `
        <label style="display:block; margin-bottom:5px;">${label || ""}</label>
        <input
            type="${type || "text"}"
            style="width: 100%; padding: 8px; box-sizing: border-box;"
            value="${value || ""}"
        />
    `;

    el.querySelector("input").addEventListener("input", (e) => {
        if (typeof onInput === "function") {
            onInput(e.target.value);
        }
    });

    return el;
};
