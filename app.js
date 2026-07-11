const components = [
  {name:"Anteojo acodado", category:"Observación", description:"Proporciona la visual de la dirección hacia la que apunta el goniómetro.", image:"assets/images/anteojo_acodado.png", tags:["Observación","Dirección"]},
  {name:"Tambor y platillo de elevación", category:"Elevación", description:"Permite medir los ángulos de elevación y varía con el movimiento vertical del anteojo.", image:"assets/images/tambor_elevacion.png", tags:["Elevación","Lectura"]},
  {name:"Lupa de la brújula", category:"Orientación", description:"Permite observar la brújula integrada y comprobar su calado.", image:"assets/images/lupa_brujula.png", tags:["Brújula","Orientación"]},
  {name:"Tornillo de movimiento particular", category:"Dirección", description:"Su tornillo produce movimiento lento y su palanca movimiento rápido; modifica las lecturas en dirección.", image:"assets/images/movimiento_particular.png", tags:["Dirección","Movimiento"]},
  {name:"Tambor y platillo de dirección", category:"Dirección", description:"Mide los ángulos en dirección y varía con el movimiento particular.", image:"assets/images/tambor_direccion.png", tags:["Dirección","Lectura"]},
  {name:"Movimiento general", category:"Dirección", description:"Mueve el conjunto en dirección sin modificar las lecturas.", image:"assets/images/movimiento_general.png", tags:["Dirección","Movimiento"]},
  {name:"Tornillos nivelantes", category:"Nivelación", description:"Los tres tornillos permiten nivelar el goniómetro sobre la placa base.", image:"assets/images/tornillos_nivelantes.png", tags:["Nivelación","Base"]},
  {name:"Brújula", category:"Orientación", description:"Indica la posición del norte magnético y permite orientar el instrumento.", image:"assets/images/brujula.png", tags:["Orientación","Norte magnético"]},
  {name:"Nivel esférico", category:"Nivelación", description:"Se utiliza para efectuar la nivelación inicial o en grueso.", image:"assets/images/nivel_esferico.png", tags:["Nivelación","Ajuste inicial"]},
  {name:"Palanca de la brújula", category:"Orientación", description:"Libera la brújula para que pueda moverse libremente.", image:"assets/images/palanca_brujula.png", tags:["Brújula","Orientación"]},
  {name:"Nivel tubular", category:"Nivelación", description:"Permite realizar la nivelación fina del instrumento.", image:"assets/images/nivel_tubular.png", tags:["Nivelación","Ajuste fino"]}
];

let current = 0;
const menu = document.getElementById("componentMenu");

function selectComponent(index){
  current = index;
  const c = components[index];
  document.getElementById("componentNumber").textContent = index + 1;
  document.getElementById("componentCategory").textContent = c.category;
  document.getElementById("componentName").textContent = c.name;
  document.getElementById("componentDescription").textContent = c.description;
  document.getElementById("componentImage").src = c.image;
  document.getElementById("componentImage").alt = c.name;
  document.getElementById("componentTags").innerHTML = c.tags.map(t => `<span>${t}</span>`).join("");
  [...menu.children].forEach((b,i) => b.classList.toggle("active", i === index));
}

components.forEach((c,i) => {
  const b = document.createElement("button");
  b.textContent = `${i+1}. ${c.name}`;
  b.addEventListener("click", () => selectComponent(i));
  menu.appendChild(b);
});
selectComponent(0);

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
function openModal(src,title){
  modalImage.src = src;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modal.showModal();
}
document.getElementById("expandComponent").addEventListener("click", () => openModal(components[current].image,components[current].name));
document.getElementById("openCompass").addEventListener("click", () => openModal("assets/images/lupa_brujula.png","Lupa de la brújula"));
document.querySelectorAll("[data-image]").forEach(b => b.addEventListener("click", () => openModal(b.dataset.image,b.dataset.title)));
document.getElementById("closeModal").addEventListener("click", () => modal.close());

const videoData = {
  correcto:{src:"assets/videos/procedimiento_correcto.mp4",status:"Procedimiento correcto",cls:"good",desc:"Secuencia de nivelación con el instrumento correctamente ajustado."},
  incorrecto:{src:"assets/videos/procedimiento_incorrecto.mp4",status:"Caso de contraste",cls:"warning",desc:"Comportamiento que permite identificar una posible descorrección del nivel."}
};
document.querySelectorAll(".video-tab").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".video-tab").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  const v = videoData[b.dataset.video];
  const video = document.getElementById("procedureVideo");
  video.src = v.src; video.load();
  const status = document.getElementById("videoStatus");
  status.textContent = v.status; status.className = `status ${v.cls}`;
  document.getElementById("videoDescription").textContent = v.desc;
}));

const sidebar = document.getElementById("sidebar");
document.getElementById("menuButton").addEventListener("click", () => sidebar.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  document.querySelectorAll(".nav-link").forEach(x => x.classList.remove("active"));
  link.classList.add("active");
  sidebar.classList.remove("open");
}));
