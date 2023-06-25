const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");


function getLocation() {
    fetch(`https://geocode.xyz/${latitude.value},${longitude.value}-0.12768?geoit=json`)
        .then(response => {
            console.log(response);

            if(!response.ok)
            throw new Error(`Geocoding throw an error (${response.status})`);

            return response.json();

        })
        .then(data => {
            console.log(data.country);
            const country = data.country;

            return fetch(`https://restcountries.com/v3.1/name/${country}`);
        })
        .then(response => {
            console.log(response);

            if(!response.ok) 
            throw new Error(`Country not found (${response.status})`);

            return response.json();
        })
        .then(data => {
            console.log(data)
            uiContent(data[0])
        })
        .catch(error => {
            errorDetect(error);
        })
}


const resultCard = document.querySelector(".resultCard");
const errorArea = document.querySelector(".error");
const countryFlag = document.querySelector("#flag");
const countryName = document.querySelector(".country");
const capitalName = document.querySelector(".capital");
const population = document.querySelector(".population");
const language = document.querySelector(".language");
const curreny = document.querySelector(".curreny");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".subRegion");
const displayError = document.querySelector(".displayError");

const uiContent = (cntryData) => {
    // console.log(cntryData)

    const cntryLanguages = cntryData.languages;
    const cntryCurrency = cntryData.currencies;
    const cntryCurrencyVal = Object.values(cntryCurrency)[0];

    resultCard.style.display = "block";
    countryFlag.src = cntryData.flags.png;
    countryName.innerText = cntryData.name.common;
    capitalName.innerText = cntryData.capital[0];
    population.innerText = cntryData.population;
    language.innerText = Object.values(cntryLanguages).join(", ");
    curreny.innerText = Object.values(cntryCurrencyVal).join(", ");
    region.innerText = cntryData.region;
    subRegion.innerText = cntryData.subregion;
    displayError.style.display = "none"; 
}

const errorDetect = (err) => {
    displayError.style.display = "block"; 
    resultCard.style.display = "none";
    displayError.innerText = `Something went wrong ${err}, Try Again!`;
}