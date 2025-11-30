const pages = [
    "comp1.html",
    "comp2.html",
    "comp3.html",
    "comp4.html",
    "comp5.html",
    "comp6.html"
];

// Récupérer l'index courant
let currentIndex = parseInt(localStorage.getItem("currentIndex"));
if (isNaN(currentIndex)) currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const btn = document.getElementById("lancerBtn");

    // Afficher la dernière face tirée si besoin
    const lastFace = parseInt(localStorage.getItem("lastFace"));
    if (lastFace && lastFace >= 1 && lastFace <= 6) {
        const angles = faceRotation(lastFace);
        dice.style.transform = `rotateX(${angles.x}deg) rotateY(${angles.y}deg)`;
    }

    btn.addEventListener("click", () => {
        // Déterminer la page et la face
        const chosenPage = pages[currentIndex];
        const faceNumber = currentIndex + 1;

        // Stocker la dernière face et incrémenter l'index
        localStorage.setItem("lastFace", faceNumber);
        currentIndex = (currentIndex + 1) % pages.length; // boucle après la dernière
        localStorage.setItem("currentIndex", currentIndex);

        // Animation du dé
        const rounds = 2 + Math.floor(Math.random() * 3);
        const finalAngles = faceRotation(faceNumber);
        const finalX = rounds * 360 + finalAngles.x;
        const finalY = rounds * 360 + finalAngles.y;

        dice.style.transition = "transform 2s ease-out";
        dice.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

        // Redirection après animation
        setTimeout(() => {
            window.location.href = chosenPage;
        }, 2100);
    });
});

function faceRotation(faceNumber) {
    const rot = {
        1: { x: 0,   y: 0 },
        2: { x: 0,   y: -90 },
        3: { x: 0,   y: -180 },
        4: { x: 0,   y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90,  y: 0 }
    };
    return rot[faceNumber];
}
