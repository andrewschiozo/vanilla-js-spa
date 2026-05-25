export const InputGroupComponent = ({ label, type, value, onInput }) => {
    const el = document.createElement("div");

    el.innerHTML = `
        <label>${label || ""}</label>
        <input
            type="${type || 'text'}"
            value="${value || ''}"
        />
    `;

    el.querySelector("input").addEventListener("input", (e) => {
        if (typeof onInput === "function") {
            onInput(e.target.value);
        }
    });

    return el;
};
