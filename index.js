const API_KEY = "94fe1d6424a2a916aa3dc64a78179208";
const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector("[data-searchInput]");
const accessesLocation = document.querySelector("[data-grantAccess]");
const weatherInfo = document.querySelector(".weatherInfo");

const weatherContainer = document.querySelector(".weatherContainer");

const allowLocationAccess = document.querySelector(".allowLocationAccess");

const loadingContainer = document.querySelector(".loadingContainer");

//weather info imports
const cityName = document.querySelector('[data-cityName]');
const countryFlag = document.querySelector('[data-countryIcon]');
const description = document.querySelector('[data-weatherDesc]');
const weatherIcon = document.querySelector('[data-weatherIcon]');
const temp = document.querySelector('[data-temp]');
const windspeed = document.querySelector('[data-windspeed]');
const humidity = document.querySelector('[data-humidity]');
const clouds = document.querySelector('[data-cloudiness]');
async function renderWeatherInfo(data){
  cityName.innerHTML = data?.name;
  countryFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    description.innerText = data?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = `${data?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${data?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${data?.main?.humidity.toFixed(2)} %`;
    clouds.innerText = `${data?.clouds?.all.toFixed(2)} %`;
    allowLocationAccess.classList.remove('active');
}
// data?.sys?.country --> this way of accessing an object is known as optional chaining opertor;
allowLocationAccess.classList.add('active');
searchInput.addEventListener('click', (e) => {
    e.preventDefault();
    loadingContainer.classList.remove("active");
    weatherInfo.classList.remove("active");
    allowLocationAccess.classList.remove("active");

});

document.addEventListener('click', function(event){
if(event.target != userWeather){

    if (event.target !== searchForm && !searchForm.contains(event.target) && currentTab != weatherInfo) {
        allowLocationAccess.classList.add("active");
        weatherInfo.classList.remove("active");
    }
    if (event.target !== searchForm && !searchForm.contains(event.target) && currentTab == weatherInfo) {
        weatherInfo.classList.add("active");
        allowLocationAccess.classList.remove("active");
    }
    
}
   
});
let currentTab = allowLocationAccess;


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value === "") {

        return;
    }
    console.log(searchInput.value);
    fetchSearchWeatherInfo(searchInput.value);
    currentTab = weatherInfo;
    searchInput.value = "";
});


async function fetchSearchWeatherInfo(city){
    console.log(city);
    loadingContainer.classList.add("active");
    weatherInfo.classList.remove("active");
    allowLocationAccess.classList.remove("active");
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

        const data = await response.json();
   loadingContainer.classList.remove('active');
   weatherInfo.classList.add('active');
   renderWeatherInfo(data);

}catch(err){
     loadingContainer.classList.remove('active');
     weatherInfo.classList.remove('active');
     notFound.classList.add('active');
  }
}
const allowAccessBtn = document.querySelector("[data-allowAccessBtn]");


function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        allowAccessBtn.style.display = 'none';
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);
}
allowAccessBtn.addEventListener('click',getLocation);

async function fetchWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    allowLocationAccess.classList.remove('active');
    
    //loading
    loadingContainer.classList.add('active');
    
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
        const data = await response.json();
        loadingContainer.classList.remove('active');
        weatherInfo.classList.add('active');
        renderWeatherInfo(data);
    }catch(err){
        notFound.classList.add('active');
        
    }
}

let userWeather = document.querySelector("[data-userWeather]");

userWeather.addEventListener('click', () => {
    console.log("chalne wala hai")
    weatherInfo.classList.remove('active');
    console.log("chala hai")
    allowLocationAccess.classList.add('active');
    currentTab = allowLocationAccess;
})


















// console.log("Welcome!");
// const API_KEY = "94fe1d6424a2a916aa3dc64a78179208";
// function renderWeatherInfo(data){
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//     document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails(){
//     try{

//         let city = "California";
    
//         const respons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    
//         const data = await respons.json();
//         console.log("Weather data:-> " , data);
//         renderWeatherInfo(data);
//     }
//     catch(err){
//         console("Devashish bahanke laude");
//     }

// }

// function switchTab(clickedTab){
//     apiErrorContainer.classList.remove("active");

//     if(clickedTab !== currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")){
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else{
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//         }
//     }
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);

//     }
//     else{
//         console.log("No geoLocation Support");

//     }

// }
// function showPosition(position){
//     let latt = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(latt);
//     console.log(longi)
// }