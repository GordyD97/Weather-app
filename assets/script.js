function initPage() {
  const cityEl = document.getElementById("enter-city");
  const clearEl = document.getElementById("clear-history");
  const searchEl = document.getElementById("search-button");
  const currentPicEl = document.getElementById("current-pic");
  var todayweatherEl = document.getElementById("today-weather");
  var fivedayEl = document.getElementById("fiveday-header");
  const currentHumidityEl = document.getElementById("humidity");
  const currentTempEl = document.getElementById("temperature");
  const currentWindEl = document.getElementById("wind-speed");
  const currentUVEl = document.getElementById("UV-index");
  const historyEl = document.getElementById("history");
  const nameEl = document.getElementById("city-name");
  
  
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  // Assigning a unique API to a variable
  const APIKey = "5ab9fa835693949a979219cf860d1300";

  function getWeather(cityName) {
      // Execute a current weather get request from open weather api
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
      axios.get(queryURL)
          .then(function (response) {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=")
              todayweatherEl.classList.remove("d-none");

              // Parse response to display current weather
              const currentDate = new Date(response.data.dt * 1000);
              const day = currentDate.getDate();
              const month = currentDate.getMonth() + 1;
              const year = currentDate.getFullYear();
              nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
              let weatherPic = response.data.weather[0].icon;
              currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
              currentPicEl.setAttribute("alt", response.data.weather[0].description);
              currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
              currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
              currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
              
              // Get UV Index
              let lat = response.data.coord.lat;
              let lon = response.data.coord.lon;
              let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
              axios.get(UVQueryURL)
                  .then(function (response) {
                      let UVIndex = document.createElement("span");
                      
                      // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                      if (response.data[0].value < 4 ) {
                          UVIndex.setAttribute("class", "badge badge-success");
                      }
                      else if (response.data[0].value < 8) {
                          UVIndex.setAttribute("class", "badge badge-warning");
                      }
                      else {
                          UVIndex.setAttribute("class", "badge badge-danger");
                      }
                      console.log(response.data[0].value)
                      UVIndex.innerHTML = response.data[0].value;
                      currentUVEl.innerHTML = "UV Index: ";
                      currentUVEl.append(UVIndex);
                  });
              
              // Get 5 day forecast for this city
             


}

// var apiurl = "https://api.openweathermap.org/data/2.5/forecast?lat=39.8693&lon=75.3824&appid=5ab9fa835693949a979219cf860d1300"



// get correct api format
//find a way to call api 

  


// function getApi(apiurl) {
//   fetch(apiurl)
//   .then(function (response) {
//     console.log('hello')
//   }
//   )}
















// function getApi() {
//     // Insert the API url to get a list of your repos
//     var weatherapi = weatherapi;
  
//     fetch(weatherapi)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         //looping over the fetch response and inserting the URL of your repos into a list
//         for (var i = 0; i < data.length; i++) {
//             //Create a list element
//             var listItem = document.createElement('li');
    
//             //Set the text of the list element to the JSON response's .html_url property
//             listItem.textContent = data[i].html_url;
    
//             //Append the li element to the id associated with the ul element.
//             // repoList.appendChild(listItem);
//         }
//     });
// }