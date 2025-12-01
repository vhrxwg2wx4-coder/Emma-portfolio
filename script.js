// --- LISTE DES PAGES ASSOCIÉES AUX 6 FACES ---
const pages = [
    "comp1.html",
    "comp2.html",
    "comp3.html",
    "comp4.html",
    "comp5.html",
    "comp6.html"
];

// --- MÉLANGE ALÉATOIRE (Fisher-Yates) ---
function shuffle(array) {
    let a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// --- INIT ---
if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify(shuffle(pages)));
    localStorage.setItem("index", "0");
}

// --- ROTATIONS DU DÉ ---
function faceRotation(faceNumber) {
    return {
        1: { x: 0, y: 0 },
        2: { x: 0, y: -90 },
        3: { x: 0, y: -180 },
        4: { x: 0, y: 90 },
        5: { x: -90, y: 0 },
        6: { x: 90, y: 0 }
    }[faceNumber];
}

document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const btn = document.getElementById("lancerBtn");

    // --- 1) AFFICHER LA DERNIÈRE FACE (mais pas l'historique pendant un lancer) ---
    const lastFace = parseInt(localStorage.getItem("lastFace"));
    if (lastFace >= 1 && lastFace <= 6) {
        const angles = faceRotation(lastFace);
        dice.style.transform = `rotateX(${angles.x}deg) rotateY(${angles.y}deg)`;
    }

    // --- 2) AFFICHER L’HISTORIQUE UNIQUEMENT AU CHARGEMENT (pas pendant l’animation) ---
    displayHistory(); // <--- affichage uniquement au chargement

    btn.addEventListener("click", () => {

    // Charger l’ordre et l’index
    let order = JSON.parse(localStorage.getItem("order"));
    let index = parseInt(localStorage.getItem("index"));

    // --- 🔥 NOUVEAU : effacer l'historique seulement si on démarre un nouveau cycle
    if (index === 0) {
        localStorage.setItem("history", JSON.stringify([]));
    }

    // Face choisie selon l’ordre défini
    const chosenPage = order[index];
    const faceNumber = pages.indexOf(chosenPage) + 1;

    // Stocker la dernière face (pour l'affichage sur la page d'accueil)
    localStorage.setItem("lastFace", faceNumber);

    // --- Ajouter la face dans l’historique ---
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.push(chosenPage);
    localStorage.setItem("history", JSON.stringify(history));

    // --- Préparer la prochaine face ---
    index++;
    if (index >= 6) {
        order = shuffle(pages); // nouvel ordre pour le nouveau cycle
        index = 0;
        localStorage.setItem("order", JSON.stringify(order));
    }

    localStorage.setItem("index", index.toString());

    // --- Animation du dé ---
    const r = 2 + Math.floor(Math.random() * 3);
    const finalRot = faceRotation(faceNumber);
    dice.style.transition = "transform 2s ease-out";
    dice.style.transform =
        `rotateX(${r * 360 + finalRot.x}deg) rotateY(${r * 360 + finalRot.y}deg)`;

    // --- Redirection après animation ---
    setTimeout(() => {
        window.location.href = chosenPage;
    }, 2100);
});

});

// --- 3) FONCTION AFFICHE HISTORIQUE UNIQUEMENT AU CHARGEMENT ---
function displayHistory() {
    const historyContainer = document.getElementById("history");
    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem("history") || "[]");

    historyContainer.innerHTML = "";

    history.forEach(page => {
        const faceNumber = pages.indexOf(page) + 1;

        const item = document.createElement("div");
        item.classList.add("history-item");
        item.innerText = faceNumber;

        item.addEventListener("click", () => {
            window.location.href = page;
        });

        historyContainer.appendChild(item);
    });
}
