const components = [
  {
    name:"Anteojo acodado",
    category:"Observación",
    description:"Proporciona la visual de la dirección hacia la que apunta el goniómetro y permite enfocar el objetivo.",
    tags:["Observación","Sistema óptico"],
    view:"vista_oblicua",
    viewTitle:"Vista oblicua",
    highlights:[[32,17,24,20,"ellipse"]],
    photos:["assets/images/nuevas/anteojo_acodado.jpg"]
  },
  {
    name:"Tambor y platillo de elevación",
    category:"Elevación",
    description:"Permite medir los ángulos de elevación. La lectura varía con el movimiento vertical del anteojo.",
    tags:["Elevación","Lectura angular"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[[47,23,20,19,"ellipse"]],
    photos:[
      "assets/images/nuevas/tambor_elevacion_frontal.jpg",
      "assets/images/nuevas/tambor_elevacion_oblicuo.jpg"
    ]
  },
  {
    name:"Lupa de la brújula",
    category:"Orientación",
    description:"Permite observar la brújula integrada en el goniómetro y comprobar su lectura durante la orientación.",
    tags:["Brújula","Orientación"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[[41,46,16,9,"rounded"]],
    photos:["assets/images/nuevas/lupa_brujula.jpg"]
  },
  {
    name:"Tornillo y palanca de movimiento particular",
    category:"Dirección",
    description:"El tornillo proporciona movimiento lento y la palanca movimiento rápido. Al accionarlos se modifica la lectura en dirección.",
    tags:["Dirección","Movimiento particular"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[[61,53,22,17,"rounded"]],
    photos:["assets/images/nuevas/movimiento_particular.jpg"]
  },
  {
    name:"Tambor y platillo de dirección",
    category:"Dirección",
    description:"Permite medir los ángulos en dirección y muestra la lectura asociada al movimiento particular.",
    tags:["Dirección","Lectura angular"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[[47,56,22,16,"ellipse"]],
    photos:["assets/images/nuevas/tambor_direccion.jpg"]
  },
  {
    name:"Tornillo y palanca de movimiento general",
    category:"Dirección",
    description:"Permite mover el conjunto en dirección sin modificar la lectura establecida en el instrumento.",
    tags:["Dirección","Movimiento general"],
    view:"vista_oblicua",
    viewTitle:"Vista oblicua",
    highlights:[[45,56,25,18,"rounded"]],
    photos:["assets/images/nuevas/movimiento_general.jpg"]
  },
  {
    name:"Tornillos nivelantes",
    category:"Nivelación",
    description:"Los tres tornillos nivelantes permiten inclinar la parte superior del instrumento hasta centrar las burbujas de los niveles.",
    tags:["Nivelación","Base"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[
      [27,67,15,12,"ellipse"],
      [39,70,16,13,"ellipse"],
      [47,78,16,12,"ellipse"]
    ],
    photos:["assets/images/nuevas/tornillos_nivelantes.jpg"]
  },
  {
    name:"Brújula",
    category:"Orientación",
    description:"Indica la posición del norte magnético y proporciona una referencia para orientar el goniómetro.",
    tags:["Orientación","Norte magnético"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[[33,39,29,16,"ellipse"]],
    photos:["assets/images/nuevas/brujula_superior.jpg"]
  },
  {
    name:"Nivel esférico",
    category:"Nivelación",
    description:"Permite realizar la nivelación inicial o en grueso antes de efectuar el ajuste fino.",
    tags:["Nivelación","Ajuste inicial"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[[39,66,17,12,"ellipse"]],
    photos:["assets/images/nuevas/nivel_esferico.jpg"]
  },
  {
    name:"Palanca de liberación de la brújula",
    category:"Orientación",
    description:"Libera la brújula para que pueda moverse libremente y adoptar la dirección del norte magnético.",
    tags:["Brújula","Liberación"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[[66,44,15,13,"rounded"]],
    photos:["assets/images/nuevas/palanca_brujula.jpg"]
  },
  {
    name:"Nivel tubular",
    category:"Nivelación",
    description:"Permite efectuar la nivelación fina del goniómetro una vez completado el ajuste inicial.",
    tags:["Nivelación","Ajuste fino"],
    view:"vista_lateral_izquierda",
    viewTitle:"Vista lateral izquierda",
    highlights:[[35,55,35,11,"rounded"]],
    photos:["assets/images/nuevas/nivel_tubular.jpg"]
  }
];

const viewFiles = {
  vista_frontal:"assets/images/nuevas/vista_frontal.jpg",
  vista_lateral_derecha:"assets/images/nuevas/vista_lateral_derecha.jpg",
  vista_lateral_izquierda:"assets/images/nuevas/vista_lateral_izquierda.jpg",
  vista_posterior:"assets/images/nuevas/vista_posterior.jpg",
  vista_oblicua:"assets/images/nuevas/vista_oblicua.jpg"
};

let currentIndex = 0;
let currentPhotoIndex = 0;

const menu = document.getElementById("componentMenu");
const locationImage = document.getElementById("locationImage");
const detailImage = document.getElementById("detailImage");
const detailThumbs = document.getElementById("detailThumbs");

let locationOverlay = document.getElementById("locationOverlay");

if(!locationOverlay){
  locationOverlay = document.createElement("div");
  locationOverlay.id = "locationOverlay";
  locationOverlay.className = "location-overlay";
  locationOverlay.setAttribute("aria-hidden","true");

  const previousLocationMarker = document.getElementById("locationMarker");

  if(previousLocationMarker){
    previousLocationMarker.replaceWith(locationOverlay);
  }else{
    locationImage.insertAdjacentElement("afterend", locationOverlay);
  }
}

function renderHighlights(component){
  locationOverlay.innerHTML = "";

  component.highlights.forEach((region,index) => {
    const [left,top,width,height,shape] = region;
    const highlight = document.createElement("div");
    highlight.className = `location-highlight ${shape}`;
    highlight.style.left = `${left}%`;
    highlight.style.top = `${top}%`;
    highlight.style.width = `${width}%`;
    highlight.style.height = `${height}%`;

    if(index === 0){
      const badge = document.createElement("span");
      badge.className = "highlight-badge";
      badge.textContent = currentIndex + 1;
      highlight.appendChild(badge);
    }

    locationOverlay.appendChild(highlight);
  });
}

function renderMenu(){
  menu.innerHTML = "";
  components.forEach((component,index) => {
    const button = document.createElement("button");
    button.type = "button";
    if(index === currentIndex) button.classList.add("active");
    button.innerHTML = `<span>${index+1}</span><strong>${component.name}</strong>`;
    button.addEventListener("click", () => selectComponent(index));
    menu.appendChild(button);
  });
}

function renderThumbs(component){
  detailThumbs.innerHTML = "";
  if(component.photos.length < 2){
    detailThumbs.hidden = true;
    return;
  }
  detailThumbs.hidden = false;
  component.photos.forEach((src,index) => {
    const button = document.createElement("button");
    button.type = "button";
    if(index === currentPhotoIndex) button.classList.add("active");
    button.innerHTML = `<img src="${src}" alt="Vista ${index+1} de ${component.name}">`;
    button.addEventListener("click", () => {
      currentPhotoIndex = index;
      detailImage.src = src;
      renderThumbs(component);
    });
    detailThumbs.appendChild(button);
  });
}

function selectComponent(index){
  currentIndex = (index + components.length) % components.length;
  currentPhotoIndex = 0;
  const component = components[currentIndex];

  document.getElementById("componentCounter").textContent = `${currentIndex+1} / ${components.length}`;
  document.getElementById("locationViewTitle").textContent = component.viewTitle;
  locationImage.src = viewFiles[component.view];
  locationImage.alt = `${component.viewTitle} del G-10`;
  renderHighlights(component);

  document.getElementById("detailNumber").textContent = currentIndex+1;
  document.getElementById("detailCategory").textContent = component.category;
  document.getElementById("detailName").textContent = component.name;
  document.getElementById("detailDescription").textContent = component.description;
  document.getElementById("detailTags").innerHTML = component.tags.map(tag => `<span>${tag}</span>`).join("");
  detailImage.src = component.photos[0];
  detailImage.alt = `Detalle de ${component.name}`;

  renderMenu();
  renderThumbs(component);
}

document.getElementById("previousComponent").addEventListener("click", () => selectComponent(currentIndex-1));
document.getElementById("nextComponent").addEventListener("click", () => selectComponent(currentIndex+1));

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

function openModal(src,title){
  modalImage.src = src;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modal.showModal();
}

document.getElementById("expandImage").addEventListener("click", () => {
  const component = components[currentIndex];
  openModal(detailImage.src, component.name);
});
document.querySelectorAll("[data-image]").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.image,button.dataset.title));
});
document.getElementById("openCompassPhoto").addEventListener("click", () => {
  openModal("assets/images/nuevas/brujula_superior.jpg","Brújula — vista superior");
});
document.getElementById("closeModal").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
  const rect = modal.getBoundingClientRect();
  if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom){
    modal.close();
  }
});

const videoData = {
  correcto:{
    src:"assets/videos/procedimiento_correcto.mp4",
    status:"Procedimiento correcto",
    cls:"good",
    description:"Secuencia de nivelación con el instrumento correctamente ajustado."
  },
  incorrecto:{
    src:"assets/videos/procedimiento_incorrecto.mp4",
    status:"Caso de contraste",
    cls:"warning",
    description:"Comportamiento que permite identificar una posible descorrección del nivel."
  }
};
document.querySelectorAll(".video-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".video-tab").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const data = videoData[button.dataset.video];
    const video = document.getElementById("procedureVideo");
    video.src = data.src;
    video.load();
    const status = document.getElementById("videoStatus");
    status.textContent = data.status;
    status.className = `status ${data.cls}`;
    document.getElementById("videoDescription").textContent = data.description;
  });
});

const sidebar = document.getElementById("sidebar");
document.getElementById("menuButton").addEventListener("click", () => sidebar.classList.toggle("open"));
document.querySelectorAll(".nav-link:not(.disabled)").forEach(link => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});

const sections = [...document.querySelectorAll(".page-section")];
const navLinks = [...document.querySelectorAll(".nav-link:not(.disabled)")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active",link.getAttribute("href") === `#${entry.target.id}`));
    const heading = entry.target.querySelector("h2");
    document.getElementById("pageTitle").textContent = heading ? heading.textContent : "Goniómetro Wild G-10";
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});
sections.forEach(section => observer.observe(section));

selectComponent(0);
