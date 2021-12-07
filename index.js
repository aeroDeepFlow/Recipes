/* let recipesJSON = [{
        "id": "0001",
        "name": "Sopa de cebolla (4 personas)",
        "Ingredientes": "1 Kg de cebollas. 2 l de caldo de carne. 100 gr mantequilla. 1 cucharada de harina. 100 gr de queso emmental suizo o gruyére rallado. Pan tostado en rebanadas. Tomillo. 1 hoja de laurel. Pimienta.",
        "Proceso": "Pelar y partir las cebollas en rodajas finas. Rehogarlas con la mantequilla. Sal y pimienta a fuego lento hasta que estén transparentes sin dorarse. Añadir la harina sin dejar de remover. Ponerlo en una cazuela con el caldo. El tomillo y el laurel. Dejar cocer a fuego lento durante unos 15 minutos. Poner las rebanadas de pan encima. Espolvorear el queso y gratinar al horno.",
        "img": "./assets/images/0001.jpg",
        "personas": 4,
        "stars": 4,
        "likes": 1232,
        "dislikes": 53,
        "tiempo": 35
    },
    {
        "id": "0002",
        "name": "Crumble de manzana vegano con avena (8 personas)",
        "Ingredientes": "215 g de LA LECHERA Veggie (185 g para las manzanas y 30 g para el crumble). 600 g de manzanas Golden. 1 cucharadita de café de extracto de vainilla. 1/2 cucharadita de café de canela en polvo. Ralladura de 1 limón. 100 g de copos de avena finos. 45 g de harina de almendras. 30 g de harina de trigo. 45 g de margarina fría.",
        "Proceso": "Precalentar el horno a 200ºC. En un bol, poner 185 g de LA LECHERA Veggie, la esencia de vainilla, la canela y la ralladura de limón. Mezclar. Pelar y cortar en gajos las manzanas e ir añadiéndolas a la mezcla anterior e ir removiendo para que las manzanas no se oxiden. En otro bol, mezclar la harina de almendras, la harina de trigo y los copos de avena. Añadir la margarina en trocitos y 30 g de LA LECHERA Veggie y mezclar. En un molde de 26x18 cm apto para el horno, añadir la manzana con todo el líquido y encima añadir el crumble de avena, desmigándolo con las manos formando pequeñas bolitas. Hornear durante unos 30 min en la parte inmediatamente superior a las guías de la mitad del horno.",
        "img": "./assets/images/0002.jpg",
        "personas": 5,
        "stars": 5,
        "likes": 2365,
        "dislikes": 521,
        "tiempo": 45
    },
    {
        "id": "0003",
        "name": "Patatas duquesa (5 personas)",
        "Ingredientes": "1 sobre (115 g) de Puré de patatas MAGGI. 400 ml de leche semidesnatada. 1 yema de huevo para pincelar. Sal. 20 g de mantequilla. pimienta blanca. nuez moscada",
        "Proceso": "Precalentar el horno en función grill fuerte. Preparar el puré de patatas con la leche siguiendo las instrucciones del embalaje. Mezclar el puré de patatas con la mantequilla, una pizca de sal y pimienta y nuez moscada al gusto. Dejar templar. Colocar la mezcla en una manga pastelera con boquilla ancha de estrella, e ir haciendo montoncitos sobre una bandeja de horno con papel vegetal. Pincelar con la yema de huevo. Gratinar unos 6-8 min hasta que empiecen a dorarse.",
        "img": "./assets/images/0003.jpg",
        "personas": 3,
        "stars": 3,
        "likes": 996,
        "dislikes": 103,
        "tiempo": 25

    }
] */

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