export const SelectGroupComponent = ({
    label,
    options,
    selected,
    onChange,
}) => {
    const el = document.createElement("div");

    el.innerHTML = `
        <label>${label || ""}</label>
        <select></select>
    `;

    const select = el.querySelector("select");

    options.forEach((o) => {
        const option = document.createElement("option");
        option.value = o.value;
        option.text = o.label;

        if (selected == o.value) {
            option.setAttribute("selected", true);
        }

        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        if (typeof onChange === "function") {
            onChange(e.target.value);
        }
    });

    return el;
};
