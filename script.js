function Weather() {
  const city = document.querySelector("#search").value;
  const units = "Imperial";
  //weather api
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=59ce9979d216eec50d11d1264a7bbb34`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      let cityTemp = document.querySelector("#temp");
      let cityWind = document.querySelector("#wind");
      let cityHumidity = document.querySelector("#humidity");
      cityTemp.innerHTML = "Temperature: " + data.main.temp + " &#176F";
      cityWind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
      cityHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
      let time = document.querySelector(".time");
      time.innerHTML = data.name + " (" + moment().format("MMMM Do YYYY") + ")";
    });
}
function Forecast(cityName) {
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=Imperial&appid=59ce9979d216eec50d11d1264a7bbb34`;
  fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 1; i < 6; i++) {
        let divId = $("div#" + i);
        divId.children()[0].innerHTML =
          data.list[i * 8 - 1].dt_txt.split(" ")[0];
        divId.children()[1].innerHTML =
          "Temperature: " + data.list[i * 8 - 1].main.temp_max + " &#176F";
        divId.children()[2].innerHTML =
          "Wind Speed: " + data.list[i * 8 - 1].wind.speed + " MPH";
        divId.children()[3].innerHTML =
          "Humidity: " + data.list[i * 8 - 1].main.humidity + "%";
      }
    });
}

function Delete(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function Save(city) {
  let searchedCities = JSON.parse(localStorage.getItem("savedCities"));
  if (!searchedCities) {
    searchedCities = [];
  }
  searchedCities.push(city);
  localStorage.setItem("savedCities", JSON.stringify(searchedCities));
  const history = $(".searchHistory");
  history.html("");
  for (let i = 0; i < searchedCities.length; i++) {
    Forecast(searchedCities[i]);
    let historyButton = document.createElement("Button");
    historyButton.innerHTML = searchedCities[i];
    historyButton.setAttribute("class", "historyButtons");
    history.append(historyButton);
  }
}

const HistoryElement = document.querySelector(".searchHistory");
const handleSearchHistoryClick = (e) => {
  const city = e.target.innerHTML;
  const units = "Imperial";
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=59ce9979d216eec50d11d1264a7bbb34`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      let cityTemp = document.querySelector("#temp");
      let cityWind = document.querySelector("#wind");
      let cityHumidity = document.querySelector("#humidity");
      cityTemp.innerHTML = "Temperature: " + data.main.temp + " &#176F";
      cityWind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
      cityHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
      let time = document.querySelector(".time");
      time.innerHTML = data.name + " (" + moment().format("MMMM Do YYYY") + ")";
    });
  Forecast(city);
};
HistoryElement.addEventListener("click", handleSearchHistoryClick);

const executeAll = () => {
  const city = document.querySelector("#search").value;
  Weather();
  Forecast(city);
  Save(city);
};

const cityInput = document.querySelector("#searchBtn");
cityInput.addEventListener("click", executeAll);
