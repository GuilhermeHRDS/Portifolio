(function () {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    const saved = localStorage.getItem("theme") || "light";

    if (saved === "dark") root.setAttribute("data-theme", "dark");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (root.getAttribute("data-theme") === "dark") {
                root.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            } else {
                root.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // impede envio real

            // mensagem elegante (alerta)
            alert("Mensagem enviada com sucesso! Obrigado pelo contato.");

            form.reset(); // limpa os campos
        });
    }
});