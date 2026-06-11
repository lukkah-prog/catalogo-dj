
// =========================
// DETECTAR MÓVIL + VIDEO HERO
// =========================

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const videos = isMobile
    ? document.querySelectorAll(".mobile-video")
    : document.querySelectorAll(".desktop-video");

let index = 0;

function cambiarVideo() {

    videos.forEach(video => {
        video.classList.remove("active");
        video.pause();
        video.currentTime = 0;
    });

    videos[index].classList.add("active");
    videos[index].play();

    videos[index].onended = () => {
        index = (index + 1) % videos.length;
        cambiarVideo();
    };
}

cambiarVideo();


// =========================
// DATA CATALOGO
// =========================

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
        "videos/full-set/video1.mp4",
        "videos/full-set/video2.mp4",
    ]
};

// =========================
// LIGHTBOX ELEMENTOS
// =========================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const whatsappBtn = document.getElementById("lightbox-whatsapp");

let currentSet = [];
let currentIndex = 0;
let currentSetName = "";


// =========================
// ABRIR CATALOGO
// =========================

document.querySelectorAll(".portada").forEach(img => {
    img.addEventListener("click", () => {

        currentSetName = img.dataset.set;
        currentSet = data[currentSetName];
        currentIndex = 0;

        updateMedia();
        lightbox.classList.add("active");

        whatsappBtn.style.display = "inline-block";
    });
});


// =========================
// ACTUALIZAR MEDIA
// =========================

function updateMedia() {

    const archivo = currentSet[currentIndex];

    if (archivo.endsWith(".mp4")) {

        lightboxImg.style.display = "none";
        if (!archivo.endsWith(".mp4")) {
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
}
        lightboxVideo.style.display = "block";
        lightboxVideo.src = archivo;
        lightboxVideo.load();

    } else {

        lightboxVideo.pause();
        lightboxVideo.style.display = "none";
        lightboxImg.style.display = "block";
        lightboxImg.src = archivo;
    }

    // =========================
    // LINK WHATSAPP POR SET
    // =========================

    const nombres = {
        normal: "Normal Set",
        normal2: "Normal Set 2",
        basic: "Basic Set",
        plus: "Plus Set",
        plus2: "Plus Set 2",
        full: "Full Set"
    };

    const nombre = nombres[currentSetName] || "Set";

    whatsappBtn.href =
        `https://wa.me/595994485841?text=Hola,%20me%20interesa%20el%20${nombre}`;
}


// =========================
// NEXT / PREV
// =========================

document.querySelector(".next").onclick = () => {
    currentIndex = (currentIndex + 1) % currentSet.length;
    updateMedia();
};

document.querySelector(".prev").onclick = () => {
    currentIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    updateMedia();
};


// =========================
// CERRAR LIGHTBOX
// =========================

document.querySelector(".close").onclick = () => {
    // reset completo al cerrar
lightboxVideo.pause();
lightboxVideo.currentTime = 0;
lightboxImg.src = "";
lightboxVideo.src = "";
    lightbox.classList.remove("active");
    lightboxVideo.pause();
    whatsappBtn.style.display = "none";
};


// click fuera
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
        lightboxVideo.pause();
        whatsappBtn.style.display = "none";
    }
});
// =========================
// EXPERIENCIA EVENTO - VIDEO CONTROL
// =========================

const videoExperiencia = document.querySelector(".video-experiencia video");

if (videoExperiencia) {
    videoExperiencia.muted = false; // podés cambiar a true si querés autoplay silencioso
    videoExperiencia.playsInline = true;
}
const expImgs = document.querySelectorAll(".exp-img");
const lightboxExp = document.getElementById("lightbox-exp");
const imgExp = document.getElementById("img-exp");

let expIndex = 0;
let expArray = [];

expImgs.forEach((img, i) => {
    expArray.push(img.src);

    img.addEventListener("click", () => {
        expIndex = i;
        openExp();
    });
});

function openExp(){
    imgExp.src = expArray[expIndex];
    lightboxExp.classList.add("active");
}

document.querySelector(".close-exp").onclick = () => {
    lightboxExp.classList.remove("active");
};

document.querySelector(".next-exp").onclick = () => {
    expIndex = (expIndex + 1) % expArray.length;
    openExp();
};

document.querySelector(".prev-exp").onclick = () => {
    expIndex = (expIndex - 1 + expArray.length) % expArray.length;
    openExp();
};

lightboxExp.addEventListener("click", (e) => {
    if(e.target === lightboxExp){
        lightboxExp.classList.remove("active");
    }
}); 
