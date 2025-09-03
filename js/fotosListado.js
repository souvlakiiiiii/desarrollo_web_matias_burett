// haz que el HTML pueda llamar a la función
window.agrandarFotos = (foto) => {
  const overlay = document.getElementById("initial_opacity_zero");

  // mostrar overlay
  overlay.style.display = "block";
  overlay.style.pointerEvents = "auto";
  overlay.style.opacity = "0.6";

  // si ya había una imagen ampliada, elimínala
  const prev = document.getElementById("foto-ampliada");
  if (prev) prev.remove();

  // crear imagen grande
  const src = document.getElementById(foto).src;
  const imgGrande = document.createElement("img");
  imgGrande.id = "foto-ampliada";
  imgGrande.src = src;
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

    // estilo para que quede debajo
    btnFoto.style.position = "fixed";
    btnFoto.style.left = "50%";
    btnFoto.style.top = "calc(50% + 320px)"; // 50% + mitad de la altura (600/2=300) + margen extra
    btnFoto.style.transform = "translateX(-50%)";
    btnFoto.style.zIndex = "10000";

    document.body.appendChild(btnFoto);

  // cerrar al hacer clic en overlay o en la imagen
  const cerrar = () => {
    imgGrande.remove();
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "none"; // si quieres animar, muévelo a 'transitionend'
    btnFoto.removeEventListener("click", cerrar);
    btnFoto.remove();
  };

  btnFoto.addEventListener("click", cerrar);
};