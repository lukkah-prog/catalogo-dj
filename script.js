// DETECTAR SI ES MOVIL

const isMobile = window.matchMedia("(max-width: 768px)").matches;

// ELEGIR VIDEOS CORRECTOS

const videos = isMobile
    ? document.querySelectorAll(".mobile-video")
    : document.querySelectorAll(".desktop-video");

let index = 0;

function cambiarVideo() {

    videos.forEach(video => {

        video.classList.remove('active');

        video.pause();

        video.currentTime = 0;
    });

    videos[index].classList.add('active');

    videos[index].play();

    videos[index].onended = () => {

        index = (index + 1) % videos.length;

        cambiarVideo();
    };
}

cambiarVideo();
const botones = document.querySelectorAll('.btn-toggle');

botones.forEach(boton => {

    boton.addEventListener('click', () => {

        const galeria = boton
            .closest('.card-set')
            .querySelector('.galeria-set');

        galeria.classList.toggle('active');

        if(galeria.classList.contains('active')){
            boton.textContent = 'Cerrar';
        } else {
            boton.textContent = 'Ver Set';
        }

    });

});
const data = {
    normal: [
        "catalogos/imagenes/normal-set/1.jpg",
        "catalogos/imagenes/normal-set/2.jpg",
        "catalogos/imagenes/normal-set/3.jpeg",
        "catalogos/imagenes/normal-set/4.jpeg",
        "catalogos/videos/normal-set/video1.mp4",
        "catalogos/videos/normal-set/video2.mp4",
        "catalogos/imagenes/normal-set/5.jpeg",
        "catalogos/videos/normal-set/video3.mp4"
    ],

    normal2: [
        "catalogos/imagenes/normal-set2/1.jpg",
        "catalogos/imagenes/normal-set2/2.jpg",
        "catalogos/videos/normal-set2/video1.mp4",
        "catalogos/videos/normal-set2/video2.mp4"
    ],

    basic: [
        "catalogos/imagenes/basic-set/1.jpg",
        "catalogos/imagenes/basic-set/2.jpg",
        "catalogos/videos/basic-set/video1.mp4",
        "catalogos/videos/basic-set/video2.mp4"
    ],

    plus: [
        "catalogos/imagenes/plus-set/1.jpg",
        "catalogos/imagenes/plus-set/2.jpg",
        "catalogos/imagenes/plus-set/3.jpeg",
        "catalogos/videos/plus-set/video1.mp4",
        "catalogos/imagenes/plus-set/4.jpeg",
        "catalogos/videos/plus-set/video2.mp4",
        "catalogos/imagenes/plus-set/5.jpeg"
    ],

    plus2: [
        "catalogos/imagenes/plus-set2/1.jpg",
        "catalogos/imagenes/plus-set2/2.jpg",
        "catalogos/imagenes/plus-set2/3.jpeg",
        "catalogos/imagenes/plus-set2/4.jpeg",
        "catalogos/imagenes/plus-set2/5.jpeg",
        "catalogos/videos/plus-set2/video1.mp4"
    ],

    full: [
        "catalogos/imagenes/full-set/1.jpg",
        "catalogos/imagenes/full-set/2.jpg",
    ]
};

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentSet = [];
let currentIndex = 0;

// abrir portada
document.querySelectorAll(".portada").forEach(img => {

    img.addEventListener("click", () => {

        const setName = img.dataset.set;

        currentSet = data[setName];

        currentIndex = 0;

        updateImage();

        lightbox.classList.add("active");

    });

});

// actualizar imagen
function updateImage() {

    const archivo = currentSet[currentIndex];

    if (
        archivo.endsWith(".mp4") ||
        archivo.endsWith(".webm") ||
        archivo.endsWith(".mov")
    ) {

        lightboxImg.style.display = "none";

        lightboxVideo.style.display = "block";

        lightboxVideo.src = archivo;

        lightboxVideo.load();

    } else {

        lightboxVideo.pause();

        lightboxVideo.style.display = "none";

        lightboxImg.style.display = "block";

        lightboxImg.src = archivo;
    }
}

// siguiente
document.querySelector(".next").onclick = () => {

    currentIndex = (currentIndex + 1) % currentSet.length;

    updateImage();

};

// anterior
document.querySelector(".prev").onclick = () => {

    currentIndex =
        (currentIndex - 1 + currentSet.length) % currentSet.length;

    updateImage();

};

// cerrar
document.querySelector(".close").onclick = () => {

    lightbox.classList.remove("active");

};

// click fuera
lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});
const lightboxVideo = document.getElementById("lightbox-video");
