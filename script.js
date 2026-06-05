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
        "fotos/normal-set/1.jpg",
        "fotos/normal-set/2.jpg",
        "fotos/normal-set/3.jpeg",
        "fotos/normal-set/4.jpeg",
        "videos/normal-set/video1.mp4",
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
