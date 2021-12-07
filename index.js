//JS file. Toy Example

const recipes = (recipesJSON) => {

    let num = document.getElementById("num-recetas");
    let img = document.getElementById("img");
    let nombre = document.getElementById("nombre-receta");
    let btnIngredientes = document.getElementById("ingredientes");
    let btnProceso = document.getElementById("proceso");
    let ingPrec = document.getElementById("ingrediente-proceso");
    let mostAct = document.querySelector("#mostrar-accion h4");
    let personas = document.querySelector(".personas>span");
    let tiempo = document.querySelector(".tiempo>span");
    let likes = document.querySelector(".likes");
    let dislikes = document.querySelector(".dislikes");
    let stars = document.querySelector(".stars");

    let valor = num.defaultValue = "0"
    let numReceta = valor;

    num.addEventListener("change", (event) => {
        numReceta = event.target.value;
        let receta = recipesJSON[numReceta];
        img.style.backgroundImage = `url('${receta.img}')`
        nombre.textContent = receta.name;

        funcReceta("Ingredientes");

    }, false)

    btnIngredientes.addEventListener("click", event => {

        mostAct.textContent = "Ingredientes";

        funcReceta("Ingredientes");

    }, false)

    btnProceso.addEventListener("click", event => {

        mostAct.textContent = "Proceso";

        funcReceta("Proceso");

    }, false)


    let funcReceta = tipo => {

        ingPrec.innerHTML = "";
        stars.innerHTML = "";

        let receta = recipesJSON[numReceta];

        let ingredientes = receta[tipo].split(". ");

        let ol = document.createElement("ol");

        ingredientes.forEach(paso => {
            let li = document.createElement("li");
            li.textContent = paso;
            ol.append(li);
        });

        ingPrec.append(ol);

        if (tipo == "Ingredientes") {
            btnIngredientes.disabled = true;
            btnProceso.disabled = false;
        }
        if (tipo == "Proceso") {
            btnIngredientes.disabled = false;
            btnProceso.disabled = true;
        }

        personas.textContent = `${receta.personas}Personas`;
        tiempo.textContent = `${receta.tiempo}min`;
        likes.textContent = `${receta.likes}`;
        dislikes.textContent = `${receta.dislikes}`;

        for (let i = 1; i <= 5; i++) {
            if (i <= receta.stars) {
                let i = document.createElement("i");
                i.classList.add("fas", "fa-star");
                stars.append(i);
            } else {
                let i = document.createElement("i");
                i.classList.add("far", "fa-star");
                stars.append(i);
            }
        }
    }

}

fetch('./assets/recipes.json')
    .then(response => response.json())
    .then(recipes);