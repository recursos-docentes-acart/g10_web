const components = [
  {
    name:"Anteojo y ocular",
    category:"Observación",
    description:"Permiten efectuar la puntería sobre la referencia. El ocular es enfocable para observar con nitidez el retículo y la imagen, que se presenta directa.",
    tags:["Observación","Puntería"],
    view:"vista_oblicua",
    viewTitle:"Vista oblicua",
    highlights:[],
    photos:["assets/images/nuevas/anteojo_ocular.jpg"]
  },
  {
    name:"Microscopio de lectura",
    category:"Lectura angular",
    description:"Permite observar simultáneamente las escalas de los limbos. La lectura horizontal aparece en amarillo y la vertical en azul.",
    tags:["Lectura","Limbo horizontal","Limbo vertical"],
    view:"vista_posterior",
    viewTitle:"Vista posterior",
    highlights:[],
    photos:["assets/images/nuevas/microscopio_lectura.jpg"]
  },
  {
    name:"Botón de mando del micrómetro",
    category:"Lectura angular",
    description:"Desplaza la escala micrométrica para hacer coincidir las divisiones observadas y completar con precisión las lecturas horizontal y vertical.",
    tags:["Micrómetro","Lectura angular"],
    view:"vista_posterior",
    viewTitle:"Vista posterior",
    highlights:[],
    photos:["assets/images/nuevas/mando_micrometro.jpg"]
  },
  {
    name:"Espejo de iluminación",
    category:"Lectura angular",
    description:"Dirige la luz ambiente hacia el sistema de lectura. Debe abrirse y orientarse hasta que las escalas se observen con claridad en el microscopio.",
    tags:["Iluminación","Microscopio"],
    view:"vista_lateral_izquierda",
    viewTitle:"Vista lateral izquierda",
    highlights:[],
    photos:["assets/images/nuevas/espejo_iluminacion.jpg"]
  },
  {
    name:"Tornillo de movimiento vertical lento",
    category:"Movimiento vertical",
    description:"Permite afinar la puntería en el plano vertical después de aproximar el anteojo mediante el desembrague vertical.",
    tags:["Movimiento vertical","Puntería fina"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[],
    photos:["assets/images/nuevas/movimiento_vertical_lento.jpg"]
  },
  {
    name:"Desembrague vertical",
    category:"Movimiento vertical",
    description:"Libera el movimiento vertical del anteojo para realizar una aproximación rápida a la referencia. Al soltarlo, el movimiento vuelve a quedar fijado.",
    tags:["Movimiento vertical","Movimiento rápido"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[],
    photos:["assets/images/nuevas/desembrague_vertical.jpg"]
  },
  {
    name:"Tornillo de movimiento horizontal lento",
    category:"Movimiento horizontal",
    description:"Permite afinar la puntería en dirección mediante el movimiento particular, haciendo variar la lectura horizontal.",
    tags:["Movimiento horizontal","Puntería fina"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[],
    photos:["assets/images/nuevas/movimiento_horizontal_lento.jpg"]
  },
  {
    name:"Desembrague horizontal",
    category:"Movimiento horizontal",
    description:"Libera el movimiento horizontal para orientar rápidamente el anteojo hacia una nueva referencia. La puntería se completa con el tornillo de movimiento lento.",
    tags:["Movimiento horizontal","Movimiento rápido"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[],
    photos:["assets/images/nuevas/desembrague_horizontal.jpg"]
  },
  {
    name:"Mando de desplazamiento del limbo",
    category:"Reiteración",
    description:"Permite cambiar la posición de origen del limbo entre series de observación y repartir las medidas por distintas zonas de su graduación. El T-20 no dispone de movimiento general lento.",
    tags:["Limbo horizontal","Reiteración"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[],
    photos:["assets/images/nuevas/mando_desplazamiento_limbo.jpg"]
  },
  {
    name:"Brújula circular",
    category:"Orientación",
    description:"La aguja imantada proporciona una referencia aproximada del norte magnético para realizar una orientación inicial del aparato.",
    tags:["Brújula","Norte magnético"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[],
    photos:["assets/images/nuevas/brujula_circular.jpg"]
  },
  {
    name:"Palanca de bloqueo de la brújula",
    category:"Orientación",
    description:"Libera la aguja imantada para que oscile y busque el norte magnético. Después de realizar la orientación, permite dejarla nuevamente bloqueada.",
    tags:["Brújula","Bloqueo"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[],
    photos:["assets/images/nuevas/palanca_brujula.jpg"]
  },
  {
    name:"Lupa de observación de la brújula",
    category:"Orientación",
    description:"Permite observar las extremidades de la aguja imantada y comprobar su coincidencia con la referencia de la brújula.",
    tags:["Brújula","Observación"],
    view:"vista_lateral_derecha",
    viewTitle:"Vista lateral derecha",
    highlights:[],
    photos:["assets/images/nuevas/lupa_brujula.jpg"]
  },
  {
    name:"Nivel esférico",
    category:"Nivelación",
    description:"Permite realizar la nivelación inicial del aparato mediante el ajuste de las patas del trípode.",
    tags:["Nivelación","Ajuste inicial"],
    view:"vista_oblicua",
    viewTitle:"Vista oblicua",
    highlights:[],
    photos:["assets/images/nuevas/nivel_esferico.jpg"]
  },
  {
    name:"Ventana del nivel tubular",
    category:"Nivelación",
    description:"Permite observar, mediante su espejo, la burbuja del nivel tubular alojado en el montante izquierdo de la alidada.",
    tags:["Nivelación","Nivel tubular"],
    view:"vista_lateral_izquierda",
    viewTitle:"Vista lateral izquierda",
    highlights:[],
    photos:["assets/images/nuevas/ventana_nivel_tubular.jpg"]
  },
  {
    name:"Tornillos nivelantes",
    category:"Nivelación",
    description:"Los tres tornillos de la plataforma nivelante permiten calar el nivel tubular y dejar vertical el eje principal del aparato.",
    tags:["Nivelación","Plataforma nivelante"],
    view:"vista_frontal",
    viewTitle:"Vista frontal",
    highlights:[],
    photos:["assets/images/nuevas/tornillos_nivelantes.jpg"]
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
  locationImage.alt = `${component.viewTitle} del T-20`;
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
const openCompassPhoto = document.getElementById("openCompassPhoto");
if(openCompassPhoto){
  openCompassPhoto.addEventListener("click", () => {
    openModal("assets/images/nuevas/brujula_circular.jpg","Brújula circular del T-20");
  });
}
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
    description:"Secuencia de nivelación cuando la burbuja permanece entre sus referencias de calado al girar el instrumento."
  },
  incorrecto:{
    src:"assets/videos/procedimiento_incorrecto.mp4",
    status:"Nivel descorregido",
    cls:"warning",
    description:"La burbuja se desplaza al girar el instrumento 180º. Debe corregirse la mitad del desplazamiento y establecer referencias de calado actuales."
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
    document.getElementById("pageTitle").textContent = heading ? heading.textContent : "Goniómetro Wild T-20";
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});
sections.forEach(section => observer.observe(section));

selectComponent(0);
