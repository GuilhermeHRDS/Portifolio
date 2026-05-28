(function () {
    function highlightCurrentNav() {
        const path = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav a").forEach((link) => {
            const href = link.getAttribute("href");
            if (href === path || (path === "" && href === "index.html")) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    highlightCurrentNav();
})();

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const prev = document.querySelector(".slider-btn.prev");
    const next = document.querySelector(".slider-btn.next");
    const dotsContainer = document.querySelector(".hero-slider-dots");

    if (!slides.length) return;

    let currentIndex = 0;

    const dots = [];
    if (dotsContainer) {
        slides.forEach((slide, index) => {
            slide.addEventListener("click", () => {
                window.location.href = "portfolio.html";
            });

            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = index === 0 ? "active" : "";
            dot.addEventListener("click", () => {
                setSlide(index);
                restartAutoplay();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    function setSlide(index) {
        currentIndex = index;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === index);
        });
        if (dots.length) {
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === index);
            });
        }
    }

    function nextSlide() {
        setSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
        setSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    let autoplayInterval = setInterval(nextSlide, 5000);

    function restartAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    if (prev) {
        prev.addEventListener("click", () => {
            prevSlide();
            restartAutoplay();
        });
    }
    if (next) {
        next.addEventListener("click", () => {
            nextSlide();
            restartAutoplay();
        });
    }

    setSlide(0);
}

// ==================== EMAIL + VALIDAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();

    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Preencha todos os campos antes de enviar.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Informe um e-mail válido.");
            return;
        }

        emailjs.sendForm("service_jj4y9ot", "template_k2jf53u", form)
            .then(() => {
                alert("Mensagem enviada com sucesso!");
                form.reset();
            })
            .catch(() => {
                alert("Erro ao enviar a mensagem. Tente novamente.");
            });
    });
    }

    const pageKey = `project-interaction:${window.location.pathname.split('/').pop()}`;
    const likeButton = document.getElementById("like-button");
    const likeCount = document.getElementById("like-count");
    const commentForm = document.getElementById("project-comment-form");
    const commentList = document.getElementById("comment-list");

    function loadProjectData() {
        const saved = localStorage.getItem(pageKey);
        return saved ? JSON.parse(saved) : { likes: 0, comments: [] };
    }

    function saveProjectData(data) {
        localStorage.setItem(pageKey, JSON.stringify(data));
    }

    function renderComments(comments) {
        if (!commentList) return;
        if (!comments.length) {
            commentList.innerHTML = '<p class="comment-empty">Seja o primeiro a comentar.</p>';
            return;
        }

        commentList.innerHTML = comments
            .map(
                (item) =>
                    `<div class="comment-card"><strong>${item.name}</strong><span>${item.date}</span><p>${item.text}</p></div>`
            )
            .join("");
    }

    const projectData = loadProjectData();
    if (likeCount) {
        likeCount.textContent = projectData.likes;
    }

    if (window.location.pathname.endsWith("portfolio.html")) {
        document.querySelectorAll(".project-likes").forEach((element) => {
            const projectKey = element.dataset.projectKey;
            const projectData = localStorage.getItem(`project-interaction:${projectKey}`);
            const likes = projectData ? JSON.parse(projectData).likes || 0 : 0;
            const countElement = element.querySelector("strong");
            if (countElement) {
                countElement.textContent = likes;
            }
        });
    }

    if (likeButton) {
        likeButton.addEventListener("click", () => {
            projectData.likes += 1;
            if (likeCount) {
                likeCount.textContent = projectData.likes;
            }
            saveProjectData(projectData);
        });
    }

    if (commentForm) {
        renderComments(projectData.comments);

        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nameField = document.getElementById("comment-name");
            const textField = document.getElementById("comment-text");

            const name = nameField ? nameField.value.trim() : "";
            const text = textField ? textField.value.trim() : "";

            if (!name || !text) {
                alert("Por favor, preencha seu nome e comentário.");
                return;
            }

            const newComment = {
                name,
                text,
                date: new Date().toLocaleDateString("pt-BR"),
            };

            projectData.comments.unshift(newComment);
            saveProjectData(projectData);
            renderComments(projectData.comments);
            commentForm.reset();
        });
    }
});
