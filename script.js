document.addEventListener("DOMContentLoaded", function () {
  const cityinput = document.getElementById("city-input");
  const getweatherbtn = document.getElementById("get-weather-btn");
  const weatherinfo = document.getElementById("weather-info");
  const citynamedisplay = document.getElementById("city-name");
  const temperaturedisplay = document.getElementById("temperature");
  const descriptiondisplay = document.getElementById("description");
  const errormessage = document.getElementById("error-message");

  const API_KEY = "96d033ceb9fcb7b47ab783ca24439044"; //env variable

  getweatherbtn.addEventListener("click", async function () {
    const city = cityinput.value.trim();
    if (!city) return;

    // it may  throw error
    // database is always in another continent

    try {
      const weatherdata = await fetchweatherdata(city);
      displayweatherdata(weatherdata);
    } catch (error) {
      showerror();
    }
  });

  async function fetchweatherdata(city) {
    // gets data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new error("city not found");
    }

    const data = await response.json();
    return data;
  }

  function displayweatherdata(data) {
    console.log(data);
    const { name, main, weather } = data;
    citynamedisplay.textContent = name;
    temperaturedisplay.textContent = `temperature :${main.temp}`;
    descriptiondisplay.textContent = `weather :${weather[0].description}`;
    // unlock thye display
    weatherinfo.classList.add("hidden");
    weatherinfo.classList.remove("hidden");
  }

  function showerror() {
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
});
