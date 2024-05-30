// This block selects the curreny location when page is loaded
let currentCity = "Accra";
let units = "metric";

//This block selects various elements on the webpage
let cityWeather = document.querySelector(".city-weather");
let timeWeather = document.querySelector(".time-weather");
let weatherCondition = document.querySelector(".weather-condition");
let iconWeather = document.querySelector(".icon-weather");
let weatherTemp = document.querySelector(".weather-temp");
let minMax = document.querySelector(".minmax");
let windWeather = document.querySelector(".wind-weather");
let HumidityWeather = document.querySelector(".humidity-weather");
let pressureWeather = document.querySelector(".pressure-weather");
let feelWeather = document.querySelector(".feel-weather");


//Code to prevent form from submitting when page is loaded
document.querySelector(".search-weather").addEventListener("submit", e => {
    let searchItems = document.querySelector(".search-weather-form");
    e.preventDefault();
    currentCity= searchItems.value;
    getWeather();
})


//Code to change between Celcius and Farenheit
document.querySelector(".search-weather-cel").addEventListener('click', () => {
    if(units !== "metric"){
        units = "metric";
        getWeather();
    }
})

document.querySelector(".search-weather-fel").addEventListener('click', () => {
    if(units !== "imperial"){
        units = "imperial";
        getWeather();
    }
})

// Creating time zone and date with function
let  convertTimeStamp = (timestamp, timezone) => {
    const convertTimezone = timezone / 3600;  

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
       hour12: true,
   }
   return date.toLocaleString("en-US", options)
  
}

// Converting country codes to names of countries
let convertCountryCode = (country) => {
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

//Get weather function with calling Apis
let getWeather = () => {
    const ApiKey = '64f60853740a1ee3ba20d0fb595c97d5'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${ApiKey}&units=${units}`).then(res => res.json()).then(data => {
    console.log(data)
    cityWeather.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    timeWeather.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weatherCondition.innerHTML = `<p>${data.weather[0].main}`
    weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`
    iconWeather.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    minMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    feelWeather.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    HumidityWeather.innerHTML = `${data.main.humidity}%`
    windWeather.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    pressureWeather.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather());