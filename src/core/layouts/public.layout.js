export const PublicLayout = (contentEl) => {
    const el = document.createElement("section");
    el.className = "public-layout";
    el.style.cssText =
        "display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5;";
    el.appendChild(contentEl);
    return el;
};
