export const HomePage = () => {
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Home</h1>
        <p>Lorem ipsum</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Vanilla JS - SPA</h3>
            <p>zero build</p>
        </div>
    `;
    return el;
};
