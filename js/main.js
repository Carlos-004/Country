import "../sass/style.scss";

const datos = []
function dataCountry(){

    const url = "https://restcountries.com/v3.1/independent?status=true";
    fetch(url)
    .then(resul => resul.json())
    .then(data => {
        datos.push(...data);
        mostrarCountry(datos)
        console.log(datos);
    });
}

const buscarCountry = document.querySelector("#buscar");
const containerBandera = document.querySelector(".banderas__grid");

function mostrarCountry(datos){
    containerBandera.innerHTML = "";
    for (let i = 0; i < datos.length; i++) {
    
        const divContainer = document.createElement("div");
        divContainer.classList.add("bandera");
    
        const pictureContainer = document.createElement("picture");
        pictureContainer.classList.add("bandera__container");
    
        const banderaImg = document.createElement("img");
        banderaImg.setAttribute("src", `${datos[i].flags.svg}`);
        banderaImg.classList.add("bandera__img");
        banderaImg.addEventListener("click", () => banderaModal(datos[i]));
        pictureContainer.append(banderaImg);
    
        const ulInfo = document.createElement("ul");
        ulInfo.classList.add("bandera__info");
    
        const nombreCountry = document.createElement("h3");
        nombreCountry.innerText = `${datos[i].name.common}`;
        nombreCountry.classList.add("bandera__country");
        ulInfo.append(nombreCountry);
    
        const population = document.createElement("li");
        population.classList.add("population", "margen");
        population.innerText = "Population: ";
        const spanPopulation = document.createElement("span");
        spanPopulation.innerText = `${datos[i].population}`;
        spanPopulation.classList.add("population__span");
        population.append(spanPopulation);
        ulInfo.append(population);
    
        const region = document.createElement("li");
        region.classList.add("region", "margen");
        region.innerText = "Region: ";
        const spanRegion = document.createElement("span");
        spanRegion.innerText = `${datos[i].region}`;
        spanRegion.classList.add("region__span");
        region.append(spanRegion);
        ulInfo.append(region);
    
        const capital = document.createElement("li");
        capital.classList.add("capital", "margen");
        capital.innerText = "Capital: ";
        const spanCapital = document.createElement("span");
        spanCapital.innerText = `${datos[i].capital}`;
        spanCapital.classList.add("capital__span");
        capital.append(spanCapital);
        ulInfo.append(capital);
    
        divContainer.append(pictureContainer);
        divContainer.append(ulInfo);
        containerBandera.append(divContainer);
    }
    
}

function buscarBnaderas(){
    buscarCountry.addEventListener("input",() =>{
        const nombre = buscarCountry.value.toLowerCase();
        const banderaFiltrad = datos.filter(filtracion =>
            filtracion.name.common.toLowerCase().includes(nombre)
        );
        mostrarCountry(banderaFiltrad)
    })
}

function banderaModal(indixe){

    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.addEventListener("click",() => cerrarModal())

    const imgModal = document.createElement("img");
    imgModal.classList.add("imagen-modal");
    imgModal.setAttribute("src",`${indixe.flags.svg}`)

    const boton = document.createElement("button");
    boton.classList.add("boton");
    boton.innerText = "X";
    boton.addEventListener("click",() =>{
        modal.remove()
    })

    modal.append(imgModal);
    modal.append(boton)
    body.append(modal)
}

function cerrarModal(){
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    
    const modal = document.querySelector(".modal");
    // modal.classLista.add("final")
    setTimeout(() => {
        modal?.remove();
    }, 500);
}

buscarBnaderas()
dataCountry()