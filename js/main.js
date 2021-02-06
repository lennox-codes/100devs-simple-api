document.querySelector("button").addEventListener("click", getFetch);
apiKey = "796c67c2f0c932f31f13f8d06d7b8b09";

function getFetch() {
  const city = document.querySelector("input").value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      //parsing data after fetch
      console.log(data);
      const mainTemp = `${makeCelsius(data.main.temp)} °C`;
      let description = data.weather[0].description;
      description =
        description.slice(0, 1).toUpperCase() + description.slice(1);

      const city = data.name;
      const country = data.sys.country;
      const icon = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const feelsLikeTemp = `${makeCelsius(data.main.feels_like)} °C`;
      //putting the information in the DOM
      document.querySelector("#city").innerText = `${city}, ${country}`;
      document.querySelector("#icon").src = iconURL;
      document.querySelector(
        "#main-temp"
      ).innerText = `${description}, ${mainTemp}`;
      document.querySelector(
        "#feels-like-temp"
      ).innerText = `Feels like: ${feelsLikeTemp}`;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function makeCelsius(temp) {
  return (temp - 273.15).toFixed(0);
}
