// Récupération des éléments de notre DOM
let resultat = document.getElementById("resultatConversion");
let messageErreur = document.getElementById("errorConversion");
let form = document.getElementById("formConversion");
let valeur = document.getElementById("valeur");
let loader = document.getElementById("loader");
let messageResultat = document.querySelector(".alert-success");
let selects = document.querySelectorAll("select");
let uniteDpart = selects[0];
let uniteArrive = selects[1];

// Création d'un objet pour les unités en grammes
const unites = {
    t:1000000,
    q:100000,
    kg:1000,
    hg:100,
    dag:10,
    g:1,
    dg:0.1,
    cg:0.01,
    mg:0.001
};

// masquer le loader avant le clic sur le bouton de soumission
loader.style.display = "none";

// Gestion des unités de départ
uniteDpart.addEventListener("change", function (){
    let uniteChoisie = this.value;

    // réinitialiser les options
    uniteArrive.innerHTML = `<option value="">Sélectionner une unité</option>`;
    for(let unite in unites){
        if (unite !== uniteChoisie) {
            let option = document.createElement("option");
            option.value = unite;
            switch(unite){
                case "t":option.textContent = "Tonne";
                break;
                case "q":option.textContent = "Quintal";
                break;
                case "kg":option.textContent = "Kilogramme";
                break;
                case "hg":option.textContent = "Hectogramme";
                break;
                case "dag":option.textContent = "Décagramme";
                break;
                case "g":option.textContent = "Gramme";
                break;
                case "dg":option.textContent = "Décigramme";
                break;
                case "cg":option.textContent = "Centigramme";
                break;
                case "mg":option.textContent = "Milligramme";
                break;
            }
            uniteArrive.appendChild(option);
        }
    }
});
// soumission du formulaire
form.addEventListener("submit", function (e){
    e.preventDefault();
   // Traiter les messages d'erreurs
   messageErreur.classList.add("d-none");
   messageResultat.classList.add("d-none");
   let val = parseFloat(valeur.value);
   let depart = uniteDpart.value;
   let arrive = uniteArrive.value;

   // vérifications
   if (isNaN(val) || !depart || !arrive) {
        messageErreur.textContent = "Veuillez remplir tous les champs.";
        messageErreur.classList.remove("d-none");
        // Disparition du message après 3 s
        setTimeout(()=>{
            messageErreur.classList.add("d-none");
        }, 5000);
        return;
   }
   // afficher le loader
   loader.style.display = "block";

   setTimeout(() => {
    // Conversion
    let valeurGramme = val * unites[depart];
    let resultatFinal = valeurGramme / unites[arrive]
    resultat.textContent = resultatFinal;
    loader.style.display = "none";
    messageResultat.classList.remove("d-none")
   }, 500);

})

