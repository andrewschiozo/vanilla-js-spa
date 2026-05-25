export const PublicLayout = (contentEl) => {
    const el = document.createElement("section");
    el.className = "public-layout";
    el.style.cssText = "display: flex; justify-content: center; align-items: center; height: 100vh;";
    el.appendChild(contentEl);
    return el;
};
