// =========================
// VIDEO DE PORTADA
// =========================

const mediaQueryMobile = window.matchMedia("(max-width: 768px)");

const videosDesktop = document.querySelectorAll(".desktop-video");
const videosMobile = document.querySelectorAll(".mobile-video");

let videosPortada = [];
let indiceVideoPortada = 0;


// Detener todos los videos de portada
function detenerVideosPortada() {
    [...videosDesktop, ...videosMobile].forEach(video => {
        video.onended = null;
        video.pause();

        try {
            video.currentTime = 0;
        } catch (error) {
            // Algunos navegadores todavía no cargaron los datos del video.
        }

        video.classList.remove("active");
    });
}


// Reproducir el video correspondiente
function reproducirVideoPortada() {
    if (videosPortada.length === 0) return;

    videosPortada.forEach(video => {
        video.classList.remove("active");
        video.pause();
    });

    const videoActual = videosPortada[indiceVideoPortada];

    videoActual.classList.add("active");
    videoActual.muted = true;
    videoActual.playsInline = true;

    const reproduccion = videoActual.play();

    // Evita errores si el navegador bloquea la reproducción automática.
    if (reproduccion && typeof reproduccion.catch === "function") {
        reproduccion.catch(error => {
            console.warn("No se pudo reproducir el video de portada:", error);
        });
    }

    videoActual.onended = () => {
        indiceVideoPortada =
            (indiceVideoPortada + 1) % videosPortada.length;

        reproducirVideoPortada();
    };
}


// Elegir los videos para celular o computadora
function configurarVideosPortada() {
    detenerVideosPortada();

    videosPortada = mediaQueryMobile.matches
        ? Array.from(videosMobile)
        : Array.from(videosDesktop);

    indiceVideoPortada = 0;

    reproducirVideoPortada();
}


// Iniciar videos de portada
configurarVideosPortada();


// Cambiar videos si cambia el tamaño de la pantalla
if (typeof mediaQueryMobile.addEventListener === "function") {
    mediaQueryMobile.addEventListener("change", configurarVideosPortada);
} else if (typeof mediaQueryMobile.addListener === "function") {
    // Compatibilidad con navegadores antiguos
    mediaQueryMobile.addListener(configurarVideosPortada);
}



// =========================
// ARCHIVOS DEL CATÁLOGO
// =========================

const data = {
    normal: [
        "fotos/normal-set/1.jpg",
        "fotos/normal-set/2.jpg",
        "fotos/basic-set/7.JPEG",
        "fotos/basic-set/6.jpeg",
        "videos/normal-set/video4.mp4",
        "videos/normal-set/video2.mp4",
        "fotos/normal-set/5.jpeg",
        "videos/normal-set/video3.mp4"
    ],

    normal2: [
        "fotos/normal-set2/1.jpg",
        "fotos/normal-set2/2.jpg",
        "videos/normal-set2/video1.mp4",
        "videos/normal-set2/video2.mp4"
    ],

    basic: [
        "fotos/basic-set/1.jpg",
        "fotos/basic-set/2.jpg",
        "videos/basic-set/video1.mp4",
        "videos/basic-set/video2.mp4"
    ],

    plus: [
        "fotos/plus-set/1.jpg",
        "fotos/plus-set/2.jpg",
        "fotos/plus-set/3.jpeg",
        "videos/plus-set/video1.mp4",
        "fotos/plus-set/6.PNG",
        "videos/plus-set/video3.mp4",
        "fotos/plus-set/4.jpeg",
        "videos/plus-set/video2.mp4",
        "fotos/plus-set/5.jpeg"
    ],

    plus2: [
        "fotos/plus-set2/1.jpg",
        "fotos/plus-set2/2.jpg",
        "fotos/plus-set2/3.jpeg",
        "fotos/plus-set2/4.jpeg",
        "fotos/plus-set2/5.jpeg",
        "videos/plus-set2/video1.mp4"
    ],

    full: [
        "fotos/full-set/1.jpg",
        "fotos/full-set/2.jpg",
        "videos/full-set/video1.mp4",
        "videos/full-set/video2.mp4"
    ]
};


// Nombres que se utilizan en WhatsApp
const nombresSets = {
    normal: "Normal Set",
    normal2: "Normal Set 2",
    basic: "Basic Set",
    plus: "Plus Set",
    plus2: "Plus Set 2",
    full: "Full Set"
};



// =========================
// ELEMENTOS DEL CATÁLOGO
// =========================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const whatsappBtn = document.getElementById("lightbox-whatsapp");

const botonCerrar = document.querySelector(".close");
const botonAnterior = document.querySelector(".prev");
const botonSiguiente = document.querySelector(".next");

let currentSet = [];
let currentIndex = 0;
let currentSetName = "";



// =========================
// ABRIR GALERÍA DEL CATÁLOGO
// =========================

document.querySelectorAll(".portada").forEach(img => {
    img.addEventListener("click", () => {
        const nombreSet = img.dataset.set;

        // Comprobar que el set existe y tiene archivos
        if (!data[nombreSet] || data[nombreSet].length === 0) {
            console.warn("No se encontraron archivos para este set.");
            return;
        }

        currentSetName = nombreSet;
        currentSet = data[nombreSet];
        currentIndex = 0;

        actualizarContenidoCatalogo();

        lightbox.classList.add("active");
        whatsappBtn.style.display = "inline-block";
    });
});



// =========================
// ACTUALIZAR FOTO O VIDEO
// =========================

function actualizarContenidoCatalogo() {
    if (currentSet.length === 0) return;

    const archivo = currentSet[currentIndex];
    const esVideo = archivo.toLowerCase().endsWith(".mp4");

    // Detener el video anterior antes de cambiar de archivo
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();

    if (esVideo) {
        lightboxImg.style.display = "none";
        lightboxImg.removeAttribute("src");

        lightboxVideo.style.display = "block";
        lightboxVideo.src = archivo;
        lightboxVideo.load();
    } else {
        lightboxVideo.style.display = "none";

        lightboxImg.style.display = "block";
        lightboxImg.src = archivo;

        const nombre = nombresSets[currentSetName] || "Set";

        lightboxImg.alt =
            `${nombre} - imagen ${currentIndex + 1} de ${currentSet.length}`;
    }

    // Crear mensaje de WhatsApp para el set seleccionado
    const nombre = nombresSets[currentSetName] || "Set";

    const mensaje =
        `Hola, me interesa el ${nombre}. ¿Podrían darme más información?`;

    whatsappBtn.href =
        `https://wa.me/595994485841?text=${encodeURIComponent(mensaje)}`;
}



// =========================
// SIGUIENTE Y ANTERIOR
// =========================

function siguienteCatalogo() {
    if (currentSet.length === 0) return;

    currentIndex = (currentIndex + 1) % currentSet.length;
    actualizarContenidoCatalogo();
}

function anteriorCatalogo() {
    if (currentSet.length === 0) return;

    currentIndex =
        (currentIndex - 1 + currentSet.length) % currentSet.length;

    actualizarContenidoCatalogo();
}

botonSiguiente.addEventListener("click", siguienteCatalogo);
botonAnterior.addEventListener("click", anteriorCatalogo);



// =========================
// CERRAR GALERÍA DEL CATÁLOGO
// =========================

function cerrarCatalogo() {
    lightbox.classList.remove("active");

    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();

    lightboxImg.removeAttribute("src");
    whatsappBtn.style.display = "none";
}

botonCerrar.addEventListener("click", cerrarCatalogo);


// Cerrar al tocar el fondo oscuro
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        cerrarCatalogo();
    }
});



// =========================
// VIDEO DE EXPERIENCIA
// =========================

const videoExperiencia = document.querySelector(
    ".video-experiencia video"
);

if (videoExperiencia) {
    videoExperiencia.muted = false;
    videoExperiencia.playsInline = true;
}



// =========================
// GALERÍA DE EXPERIENCIA
// =========================

const expImgs = document.querySelectorAll(".exp-img");
const lightboxExp = document.getElementById("lightbox-exp");
const imgExp = document.getElementById("img-exp");

const botonCerrarExp = document.querySelector(".close-exp");
const botonAnteriorExp = document.querySelector(".prev-exp");
const botonSiguienteExp = document.querySelector(".next-exp");

const expArray = Array.from(expImgs).map(img => ({
    src: img.src,
    alt: img.alt
}));

let expIndex = 0;


// Abrir la imagen seleccionada
expImgs.forEach((img, indice) => {
    img.addEventListener("click", () => {
        expIndex = indice;
        abrirExperiencia();
    });
});


function abrirExperiencia() {
    if (expArray.length === 0) return;

    imgExp.src = expArray[expIndex].src;

    imgExp.alt =
        expArray[expIndex].alt || "Fotografía de un evento de Lukkah Sound";

    lightboxExp.classList.add("active");
}


function cerrarExperiencia() {
    lightboxExp.classList.remove("active");
    imgExp.removeAttribute("src");
}


function siguienteExperiencia() {
    if (expArray.length === 0) return;

    expIndex = (expIndex + 1) % expArray.length;
    abrirExperiencia();
}


function anteriorExperiencia() {
    if (expArray.length === 0) return;

    expIndex =
        (expIndex - 1 + expArray.length) % expArray.length;

    abrirExperiencia();
}


botonCerrarExp.addEventListener("click", cerrarExperiencia);
botonSiguienteExp.addEventListener("click", siguienteExperiencia);
botonAnteriorExp.addEventListener("click", anteriorExperiencia);


// Cerrar al tocar el fondo oscuro
lightboxExp.addEventListener("click", event => {
    if (event.target === lightboxExp) {
        cerrarExperiencia();
    }
});



// =========================
// DESLIZAR CON EL DEDO
// =========================

function agregarDeslizamiento(elemento, siguiente, anterior) {
    let inicioX = 0;
    let inicioY = 0;
    let puedeDeslizar = false;

    elemento.addEventListener(
        "touchstart",
        event => {
            // No interferir con los controles del video, botones o enlaces.
            if (
                event.target.closest("video") ||
                event.target.closest("button") ||
                event.target.closest("a")
            ) {
                puedeDeslizar = false;
                return;
            }

            if (event.touches.length !== 1) {
                puedeDeslizar = false;
                return;
            }

            inicioX = event.touches[0].clientX;
            inicioY = event.touches[0].clientY;
            puedeDeslizar = true;
        },
        { passive: true }
    );

    elemento.addEventListener(
        "touchend",
        event => {
            if (!puedeDeslizar || event.changedTouches.length === 0) {
                return;
            }

            const finalX = event.changedTouches[0].clientX;
            const finalY = event.changedTouches[0].clientY;

            const distanciaX = finalX - inicioX;
            const distanciaY = finalY - inicioY;

            const distanciaMinima = 50;

            // Solo avanzar si el movimiento es principalmente horizontal.
            if (
                Math.abs(distanciaX) >= distanciaMinima &&
                Math.abs(distanciaX) > Math.abs(distanciaY)
            ) {
                if (distanciaX < 0) {
                    siguiente();
                } else {
                    anterior();
                }
            }

            puedeDeslizar = false;
        },
        { passive: true }
    );

    elemento.addEventListener(
        "touchcancel",
        () => {
            puedeDeslizar = false;
        },
        { passive: true }
    );
}


// Deslizamiento en la galería del catálogo
agregarDeslizamiento(
    lightbox,
    siguienteCatalogo,
    anteriorCatalogo
);


// Deslizamiento en la galería de experiencia
agregarDeslizamiento(
    lightboxExp,
    siguienteExperiencia,
    anteriorExperiencia
);



// =========================
// CONTROLES DE TECLADO
// =========================

document.addEventListener("keydown", event => {
    const catalogoAbierto = lightbox.classList.contains("active");
    const experienciaAbierta = lightboxExp.classList.contains("active");

    if (event.key === "Escape") {
        if (catalogoAbierto) cerrarCatalogo();
        if (experienciaAbierta) cerrarExperiencia();
    }

    if (event.key === "ArrowRight") {
        if (catalogoAbierto) siguienteCatalogo();
        if (experienciaAbierta) siguienteExperiencia();
    }

    if (event.key === "ArrowLeft") {
        if (catalogoAbierto) anteriorCatalogo();
        if (experienciaAbierta) anteriorExperiencia();
    }
});
const videosExperiencias = document.querySelectorAll(
    ".galeria-videos video"
);

videosExperiencias.forEach(video => {
    video.addEventListener("play", () => {
        videosExperiencias.forEach(otroVideo => {
            if (otroVideo !== video) {
                otroVideo.pause();
            }
        });
    });
});
// =========================
// VIDEOS AGRUPADOS POR EVENTO
// =========================

const videosPorEvento = {
    evento1: [
        "videos/evento1/xvstar.mp4",
        "videos/evento1/xvstarr.mov"
    ],

    evento2: [
        "videos/evento2/tiroteo.mp4",
        "videos/evento2/tiroteo2.mov"
    ],

    evento3: [
        "videos/evento3/xvcit.mp4",
        "videos/evento3/xvcitt.mp4"
    ],

    evento4: [
        "videos/evento4/16a.MOV",
        "videos/evento4/16aa.MOV"
    ]
};

document.querySelectorAll(".evento-card[data-evento]").forEach(tarjeta => {
    const archivos = videosPorEvento[tarjeta.dataset.evento];

    const video = tarjeta.querySelector(".evento-video");
    const anterior = tarjeta.querySelector(".evento-anterior");
    const siguiente = tarjeta.querySelector(".evento-siguiente");
    const contador = tarjeta.querySelector(".evento-contador");

    if (!archivos?.length || !video || !anterior || !siguiente || !contador) {
        return;
    }

    // Cada evento tiene su propio índice.
    let indice = 0;
    let gesto = null;
    let ignorarClickHasta = 0;

    function mostrarVideo() {
        video.pause();
        video.src = archivos[indice];
        video.load();

        contador.textContent = `${indice + 1} / ${archivos.length}`;
    }

    function cambiarVideo(direccion) {
        indice =
            (indice + direccion + archivos.length) % archivos.length;

        mostrarVideo();
    }

    anterior.addEventListener("click", () => {
        cambiarVideo(-1);
    });

    siguiente.addEventListener("click", () => {
        cambiarVideo(1);
    });

    // Reproducir solo un video de evento a la vez.
    video.addEventListener("play", () => {
        document.querySelectorAll(".evento-video").forEach(otroVideo => {
            if (otroVideo !== video) {
                otroVideo.pause();
            }
        });
    });

    // Deslizar sobre el video sin usar la zona de controles.
    video.addEventListener("touchstart", event => {
        gesto = null;

        if (event.touches.length !== 1) return;

        const toque = event.touches[0];
        const limites = video.getBoundingClientRect();

        if (toque.clientY > limites.bottom - 60) return;

        gesto = {
            x: toque.clientX,
            y: toque.clientY
        };
    }, { passive: true });

    video.addEventListener("touchmove", event => {
        if (!gesto) return;

        if (event.touches.length !== 1) {
            gesto = null;
            return;
        }

        const distanciaX = event.touches[0].clientX - gesto.x;
        const distanciaY = event.touches[0].clientY - gesto.y;

        // Cancelar si la intención es desplazarse verticalmente.
        if (
            Math.abs(distanciaY) > 15 &&
            Math.abs(distanciaY) >= Math.abs(distanciaX)
        ) {
            gesto = null;
        }
    }, { passive: true });

    video.addEventListener("touchend", event => {
        if (!gesto || event.changedTouches.length === 0) return;

        const toque = event.changedTouches[0];
        const distanciaX = toque.clientX - gesto.x;
        const distanciaY = toque.clientY - gesto.y;

        gesto = null;

        if (
            Math.abs(distanciaX) > 60 &&
            Math.abs(distanciaX) > Math.abs(distanciaY) * 1.5
        ) {
            ignorarClickHasta = Date.now() + 500;
            cambiarVideo(distanciaX < 0 ? 1 : -1);
        }
    }, { passive: true });

    video.addEventListener("touchcancel", () => {
        gesto = null;
    }, { passive: true });

    // Evitar un clic accidental después de deslizar.
    video.addEventListener("click", event => {
        if (Date.now() < ignorarClickHasta) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }, true);

    mostrarVideo();
});
// =========================
// CARRUSEL Y VISOR DE MONTAJES
// =========================

(() => {
    const pista = document.querySelector(".montajes-pista");
    const modal = document.getElementById("montajes-modal");

    if (!pista || !modal) return;

    const fotos = Array.from(
        pista.querySelectorAll(".montaje-foto")
    );

    if (!fotos.length) return;

    const carrusel = pista.closest(".montajes-carrusel");
    const imagenGrande = modal.querySelector(".montajes-modal-img");
    const contador = modal.querySelector(".montajes-modal-contador");

    let indiceModal = 0;
    let botonOrigen = null;
    let overflowAnterior = "";

    // Encontrar la foto más próxima al centro del carrusel.
    function indiceVisible() {
        const limites = pista.getBoundingClientRect();
        const centro = limites.left + limites.width / 2;

        let resultado = 0;
        let menorDistancia = Infinity;

        fotos.forEach((foto, indice) => {
            const rect = foto.getBoundingClientRect();
            const distancia = Math.abs(
                rect.left + rect.width / 2 - centro
            );

            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                resultado = indice;
            }
        });

        return resultado;
    }

    function moverCarrusel(direccion) {
        const indice =
            (indiceVisible() + direccion + fotos.length) %
            fotos.length;

        const limitesPista = pista.getBoundingClientRect();
        const limitesFoto = fotos[indice].getBoundingClientRect();

        pista.scrollBy({
            left:
                limitesFoto.left -
                limitesPista.left -
                (pista.clientWidth - limitesFoto.width) / 2,

            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    }

    carrusel.querySelector(".montajes-anterior")
        .addEventListener("click", () => moverCarrusel(-1));

    carrusel.querySelector(".montajes-siguiente")
        .addEventListener("click", () => moverCarrusel(1));

    // Actualizar el visor ampliado.
    function mostrarFoto(indice) {
        indiceModal = (indice + fotos.length) % fotos.length;

        const imagen = fotos[indiceModal].querySelector("img");

        imagenGrande.src = imagen.currentSrc || imagen.src;
        imagenGrande.alt = imagen.alt;
        contador.textContent = `${indiceModal + 1} / ${fotos.length}`;
    }

    function abrirFoto(indice, boton) {
        botonOrigen = boton;
        mostrarFoto(indice);

        overflowAnterior = document.body.style.overflow;
        modal.showModal();
        document.body.style.overflow = "hidden";
    }

    function cerrarFoto() {
        modal.close();
    }

    modal.querySelector(".montajes-cerrar")
        .addEventListener("click", cerrarFoto);

    modal.querySelector(".montajes-modal-anterior")
        .addEventListener("click", () => mostrarFoto(indiceModal - 1));

    modal.querySelector(".montajes-modal-siguiente")
        .addEventListener("click", () => mostrarFoto(indiceModal + 1));

    modal.addEventListener("close", () => {
        document.body.style.overflow = overflowAnterior;

        if (botonOrigen) {
            botonOrigen.focus({ preventScroll: true });
        }
    });

    // Cerrar al tocar el fondo, sin confundirlo con un deslizamiento.
    const fondo = modal.querySelector(".montajes-modal-contenido");
    let toqueFondo = null;

    fondo.addEventListener("pointerdown", event => {
        toqueFondo = event.target === fondo
            ? { x: event.clientX, y: event.clientY }
            : null;
    });

    fondo.addEventListener("pointerup", event => {
        if (
            toqueFondo &&
            event.target === fondo &&
            Math.hypot(
                event.clientX - toqueFondo.x,
                event.clientY - toqueFondo.y
            ) < 10
        ) {
            cerrarFoto();
        }

        toqueFondo = null;
    });

    fondo.addEventListener("pointercancel", () => {
        toqueFondo = null;
    });

    // Teclado: las flechas cambian la foto; Escape cierra el dialog.
    modal.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            mostrarFoto(indiceModal + 1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            event.stopPropagation();
            mostrarFoto(indiceModal - 1);
        }
    });

    // Evitar abrir una foto cuando se estaba deslizando el carrusel.
    let inicioPista = null;
    let arrastrando = false;
    let bloquearClickHasta = 0;

    pista.addEventListener("pointerdown", event => {
        inicioPista = {
            x: event.clientX,
            y: event.clientY,
            scroll: pista.scrollLeft
        };

        arrastrando = false;
    }, { passive: true });

    pista.addEventListener("pointermove", event => {
        if (!inicioPista) return;

        if (
            Math.hypot(
                event.clientX - inicioPista.x,
                event.clientY - inicioPista.y
            ) > 10
        ) {
            arrastrando = true;
            bloquearClickHasta = Date.now() + 500;
        }
    }, { passive: true });

    pista.addEventListener("scroll", () => {
        if (
            inicioPista &&
            Math.abs(pista.scrollLeft - inicioPista.scroll) > 5
        ) {
            arrastrando = true;
            bloquearClickHasta = Date.now() + 500;
        }
    }, { passive: true });

    function terminarGestoPista() {
        if (arrastrando) {
            bloquearClickHasta = Date.now() + 500;
        }

        inicioPista = null;
        arrastrando = false;
    }

    window.addEventListener("pointerup", terminarGestoPista, {
        passive: true
    });

    window.addEventListener("pointercancel", terminarGestoPista, {
        passive: true
    });

    fotos.forEach((boton, indice) => {
        boton.addEventListener("click", event => {
            if (event.detail !== 0 && Date.now() < bloquearClickHasta) {
                event.preventDefault();
                return;
            }

            abrirFoto(indice, boton);
        });
    });

    // Deslizar sobre la imagen ampliada.
    let gestoModal = null;

    imagenGrande.addEventListener("touchstart", event => {
        gestoModal = event.touches.length === 1
            ? {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            }
            : null;
    }, { passive: true });

    imagenGrande.addEventListener("touchmove", event => {
        if (event.touches.length !== 1) {
            gestoModal = null;
        }
    }, { passive: true });

    imagenGrande.addEventListener("touchend", event => {
        if (!gestoModal || !event.changedTouches.length) return;

        const toque = event.changedTouches[0];
        const distanciaX = toque.clientX - gestoModal.x;
        const distanciaY = toque.clientY - gestoModal.y;

        gestoModal = null;

        if (
            Math.abs(distanciaX) > 60 &&
            Math.abs(distanciaX) > Math.abs(distanciaY) * 1.5
        ) {
            mostrarFoto(indiceModal + (distanciaX < 0 ? 1 : -1));
        }
    }, { passive: true });

    imagenGrande.addEventListener("touchcancel", () => {
        gestoModal = null;
    }, { passive: true });
})();
