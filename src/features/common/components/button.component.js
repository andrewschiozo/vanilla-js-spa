import { colors } from "@/core/layouts/colors.js";

export const ButtonComponent = ({
    child,
    onClick,
    color = "default",
    size = "default",
}) => {
    const el = document.createElement("button");

    const sizes = {
        default: "10px 15px",
        large: "15px 20px",
        small: "5px 10px",
    };

    el.style.cssText = `
        background:${colors[color] || colors.default};
        color:white;
        border:none;
        padding:${sizes[size] || sizes.default};
        cursor:pointer;
        border-radius:4px;
    `;

    el.addEventListener("click", onClick);

    child.tagName ? el.append(child) : (el.innerHTML = child);

    return el;
};
