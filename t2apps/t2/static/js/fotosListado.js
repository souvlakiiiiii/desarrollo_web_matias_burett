window.agrandarFotos = (elementoImg) => {
  const overlay = document.getElementById("initial_opacity_zero");

  overlay.style.display = "block";
  overlay.style.pointerEvents = "auto";
  overlay.style.opacity = "0.6";

  const prev = document.getElementById("foto-ampliada");
  if (prev) prev.remove();

  const imgGrande = document.createElement("img");
  imgGrande.id = "foto-ampliada";
  imgGrande.src = elementoImg.src;
  imgGrande.style.position = "fixed";
  imgGrande.style.left = "50%";
  imgGrande.style.top = "50%";
  imgGrande.style.transform = "translate(-50%, -50%)";
  imgGrande.style.width = "800px";
  imgGrande.style.height = "600px";
  imgGrande.style.zIndex = "9999";

  document.body.appendChild(imgGrande);

  const btnFoto = document.createElement("button");
  btnFoto.id = "btnfoto";
  btnFoto.innerText = "Cerrar foto";
  btnFoto.style.position = "fixed";
  btnFoto.style.left = "50%";
  btnFoto.style.top = "calc(50% + 320px)";
  btnFoto.style.transform = "translateX(-50%)";
  btnFoto.style.zIndex = "10000";

  document.body.appendChild(btnFoto);

  const cerrar = () => {
    imgGrande.remove();
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "none";
    btnFoto.removeEventListener("click", cerrar);
    btnFoto.remove();
  };

  btnFoto.addEventListener("click", cerrar);
};