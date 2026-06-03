// DETECTAR SI ES MOVIL

const videos = window.matchMedia("(max-width: 768px)").matches
    ? document.querySelectorAll(".mobile-video")
    : document.querySelectorAll(".desktop-video");

// ELEGIR VIDEOS CORRECTOS

const videos = isMobile
    ? document.querySelectorAll('.mobile-video')
    : document.querySelectorAll('.desktop-video');

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
        "imagenes/catalogos/normal-set/1.jpg",
        "imagenes/catalogos/normal-set/2.jpg"
    ],

    normal2: [
        "imagenes/catalogos/normal-set2/1.jpg",
        "imagenes/catalogos/normal-set2/2.jpg"
    ],

    basic: [
        "imagenes/catalogos/basic-set/1.jpg",
        "imagenes/catalogos/basic-set/2.jpg",
        "imagenes/catalogos/basic-set/3.jpg"
    ],

    plus: [
        "imagenes/catalogos/plus-set/1.jpg",
        "imagenes/catalogos/plus-set/2.jpg"
    ],

    plus2: [
        "imagenes/catalogos/plus-set2/1.jpg",
        "imagenes/catalogos/plus-set2/2.jpg"
    ],

    full: [
        "imagenes/catalogos/full-set/1.jpg",
        "imagenes/catalogos/full-set/2.jpg"
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

    lightboxImg.src = currentSet[currentIndex];

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
