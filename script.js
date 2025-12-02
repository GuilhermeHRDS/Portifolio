// Função imediata para controlar o tema claro/escuro
(function () {
    const themeToggle = document.getElementById("theme-toggle"); // botão de alternância
    const root = document.documentElement; // elemento <html>
    const saved = localStorage.getItem("theme") || "light"; // tema salvo no navegador

    // Aplica o tema escuro caso esteja salvo
    if (saved === "dark") root.setAttribute("data-theme", "dark");

    // Se o botão existir, adiciona evento de clique
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            // Se já estiver no tema escuro, volta para o claro
            if (root.getAttribute("data-theme") === "dark") {
                root.removeAttribute("data-theme");
                localStorage.setItem("theme", "light"); // salva preferência
            }
            // Caso contrário, ativa o tema escuro
            else {
                root.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark"); // salva preferência
            }
        });
    }
})();

// Executa quando o conteúdo da página é carregado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Campos do formulário
            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");

            // Validação: campos vazios
            if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
                alert("Por favor, preencha todos os campos antes de enviar.");
                return;
            }

            // Validação: e-mail válido
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                alert("Por favor, informe um e-mail válido.");
                return;
            }

            // Se passou por todas as validações:
            alert("Mensagem enviada com sucesso! Obrigado pelo contato.");

            form.reset();
        });
    }
});
