export const ButtonComponent = ({
    child,
    onClick,
    color = "blue",
    style = ""
}) => {
    const el = document.createElement("button");

    el.style.cssText = "border: none;" + style
    el.classList.add(`pico-background-${color || 'blue'}`)

    el.addEventListener("click", onClick);

    child.tagName ? el.append(child) : (el.innerHTML = child);

    return el;
};
