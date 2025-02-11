document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".navegacionPaginas");

    function toggleMenu() {
        menu?.classList.toggle("mostrar", !menu.classList.contains("mostrar"));
    }

    const titulo = document.getElementById("raqueta-titulo");
    const descripcion = document.getElementById("raqueta-descripcion");
    const carrusel = document.querySelector(".groupRaquetas-carrusel");

    const btnPrev = document.querySelector(".antescarrusel");
    const btnNext = document.querySelector(".siguientecarrusel");
    const indicadores = Array.from(document.querySelectorAll(".op-carrusel"));

    const slider = document.querySelector(".groupRaquetas-slider");
    const slides = slider ? Array.from(slider.children) : [];

    let index = 0;

    const raquetas = [
        {
            titulo: "Nuestras Raquetas",
            descripcion: "Conoce nuestras raquetas y aprende a jugar Tennis como un profesional.",
            fondo: "assets/img/ball-color-court-1405355.webp",
        },
        {
            titulo: "Raqueta Intermedia",
            descripcion: "Perfecta para quienes están mejorando su juego.",
            fondo: "assets/img/ball-color-court-1405355.webp",
        },
        {
            titulo: "Raqueta Principiante",
            descripcion: "Ideal para quienes están empezando en el tenis.",
            fondo: "assets/img/ball-color-court-1405355.webp",
        },
        {
            titulo: "Raqueta de Competición",
            descripcion: "Diseñada para torneos y alto rendimiento.",
            fondo: "assets/img/ball-color-court-1405355.webp",
        },
    ];

    function actualizarCarrusel() {
        if (!titulo || !descripcion || !carrusel) return;

        titulo.textContent = raquetas[index].titulo;
        descripcion.textContent = raquetas[index].descripcion;
        carrusel.style.backgroundImage = `url('${raquetas[index].fondo}')`;

        const startIndex = Math.min(index * 3, Math.max(0, slides.length - 3));
        slides.forEach((slide, i) => {
            slide.classList.toggle("visible", i >= startIndex && i < startIndex + 3);
            slide.classList.toggle("oculto", !(i >= startIndex && i < startIndex + 3));
        });

        indicadores.forEach((btn, i) => {
            btn.classList.toggle("activo", i === index);
        });

        actualizarBotones();
    }

    function actualizarBotones() {
        if (!btnPrev || !btnNext) return;

        btnPrev.classList.toggle("btn-disabled", index === 0);
        btnNext.classList.toggle("btn-disabled", index === raquetas.length - 1);
    }

    function configurarEventos() {
        if (btnNext) {
            btnNext.addEventListener("click", () => {
                index = index === raquetas.length - 1 ? 0 : index + 1;
                actualizarCarrusel();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", () => {
                index = index === 0 ? raquetas.length - 1 : index - 1;
                actualizarCarrusel();
            });
        }

        indicadores.forEach((btn) => {
            btn.addEventListener("click", () => {
                index = Number(btn.dataset.index);
                actualizarCarrusel();
            });
        });
    }

    function inicializarCarrusel() {
        if (!titulo || !descripcion || !carrusel) return;

        actualizarCarrusel();
        configurarEventos();
    }

    inicializarCarrusel();
});
