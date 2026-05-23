import { colors } from "@/core/layouts/colors.js";

export const BadgeComponent = ({ text, onClick = () => {}, color }) => {
    const el = document.createElement("button");

    el.style.cssText = `
        background:${colors[color] || colors.default};
        color:white;
        border:none;
        padding:3px 10px;
        cursor:pointer;
        border-radius:4px;
        text-transform:uppercase;
        font-weight: bold
    `;

    el.addEventListener("click", onClick);

    el.innerText = text;

    return el;
};
