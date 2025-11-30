// Liste des pages liées aux 6 faces
const pages = [
    "comp1.html",
    "comp2.html",
    "comp3.html",
    "comp4.html",
    "comp5.html",
    "comp6.html"
];

// Initialisation du cycle si nécessaire
function initCycle() {
    localStorage.setItem("facesLeft", JSON.stringify([...pages]));
}

let facesLeft = JSON.parse(localStorage.getItem("facesLeft"));
if (!facesLeft || facesLeft.length === 0) initCycle();

// --------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const btn = document.getElementById("lancerBtn");

    // Réafficher la dernière face tirée si existante
    const lastFace = parseInt(localStorage.getItem("lastFace"));
    if (lastFace >= 1 && lastFace <= 6) {
        const angles = faceRotation(lastFace);
        dice.style.transform = `rotateX(${angles.x}deg) rotateY(${angles.y}deg)`;
    }

    btn.addEventListener("click", () => {

        // Récupère le cycle actualisé
        let facesLeft = JSON.parse(localStorage.getItem("facesLeft"));

        // Tirage ALÉATOIRE mais uniquement dans les faces restantes
        const index = Math.floor(Math.random() * facesLeft.length);
        const chosenPage = facesLeft[index];
        const faceNumber = pages.indexOf(chosenPage) + 1;

        // Retirer la page tirée
        facesLeft.splice(index, 1);
        localStorage.setItem("facesLeft", JSON.stringify(facesLeft));

        // Reset du cycle si vide
        if (facesLeft.length === 0) initCycle();

        // Stocker la dernière face pour l’affichage initial
        localStorage.setItem("lastFace", faceNumber);

        // Animation du dé
        const r = 2 + Math.floor(Math.random() * 3);
        const finalRot = faceRotation(faceNumber);
        dice.style.transition = "transform 2s ease-out";
        dice.style.transform = `rotateX(${r * 360 + finalRot.x}deg) rotateY(${r * 360 + finalRot.y}deg)`;

        // Redirection
        setTimeout(() => {
            window.location.href = chosenPage;
        }, 2100);
    });
});

// Rotation exacte pour les faces
function faceRotation(faceNumber) {
    const rot = {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    };
    return rot[faceNumber];
}
