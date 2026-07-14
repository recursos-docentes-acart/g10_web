const {targets}=window.G10_DATA;
const grid=document.getElementById("exerciseGrid");
targets.forEach(target=>{
  const card=document.createElement("article");
  card.className="exercise-card";
  card.innerHTML=`
    <img src="assets/objetivo_${target.id}.jpg" alt="Referencia amplia del objetivo ${target.id}">
    <div class="exercise-card-body">
      <div class="exercise-card-header"><span class="exercise-number">${target.id}</span><h3>${target.name}</h3></div>
      <p>${target.description}</p>
      <div class="exercise-card-actions"><a class="primary" href="index.html?exercise=${target.id}">Comenzar ejercicio</a></div>
    </div>`;
  grid.appendChild(card);
});
