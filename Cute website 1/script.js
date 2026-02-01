function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

const moveRandom = document.querySelector("#move-random");

// Pour ordinateur (quand la souris survole)
moveRandom.addEventListener("mouseenter", function (e) {
  moveRandomEl(e.target);
});

// Pour téléphone (quand le doigt touche)
moveRandom.addEventListener("touchstart", function (e) {
  e.preventDefault(); // <--- C'est la clé ! Ça empêche le clic de valider le lien
  moveRandomEl(e.target);
});

// Sécurité supplémentaire : si jamais un clic passe quand même
moveRandom.addEventListener("click", function (e) {
  e.preventDefault();
  moveRandomEl(e.target);
});
