export const HomePage = () => {
    const el = document.createElement("div");
    el.innerHTML = `
        <h1>Home</h1>
        <hr />
        <div style="padding: 20px;">
            <h3>Vanilla JS - SPA</h3>
            <p>zero build</p>
        </div>
    `;
    return el;
};
