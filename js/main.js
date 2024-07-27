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

const formulario = document.querySelector(".formulario")
const buscarCountry = document.querySelector("#buscar");
const containerBandera = document.querySelector(".banderas__grid");

function mostrarCountry(conutryFil){
    containerBandera.innerHTML = "";
    conutryFil.forEach(banderas =>{
        const divContainer = document.createElement("div");
        divContainer.classList.add("bandera");

        const pictureContainer = document.createElement("picture");
        pictureContainer.classList.add("bandera__container");

        const banderaImg = document.createElement("img");
        banderaImg.setAttribute("src",`${banderas.flags.svg}`);
        banderaImg.classList.add("bandera__img");
        pictureContainer.append(banderaImg);

        const ulInfo = document.createElement("ul");
        ulInfo.classList.add("bandera__info");

        const nombreCountry = document.createElement("h3");
        nombreCountry.innerText = `${banderas.name.common}`;
        nombreCountry.classList.add("bandera__country");
        ulInfo.append(nombreCountry);


        const population = document.createElement("li");
        population.classList.add("population","margen");
        population.innerText = "Population: ";
        const spanPopulation = document.createElement("span");
        spanPopulation.innerText = `${banderas.population}`;
        spanPopulation.classList.add("population__span")
        population.append(spanPopulation);
        ulInfo.append(population);

        const region = document.createElement("li");
        region.classList.add("region","margen");
        region.innerText = "Region: ";
        const spanRegion = document.createElement("span");
        spanRegion.innerText = `${banderas.region}`;
        spanRegion.classList.add("region__span")
        region.append(spanRegion);
        ulInfo.append(region);

        const capital = document.createElement("li");
        capital.classList.add("capital","margen");
        capital.innerText = "capital: ";
        const spanCapital= document.createElement("span");
        spanCapital.innerText = `${banderas.capital}`;
        spanCapital.classList.add("capital__span");
        capital.append(spanCapital);
        ulInfo.append(capital);


        divContainer.append(pictureContainer);
        divContainer.append(ulInfo);
        containerBandera.append(divContainer);
    })
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

buscarBnaderas()
dataCountry()