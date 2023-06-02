import { useState } from "react";
import './App.css';

function App() {

  const [City, setCity] = useState("")
  const [data, setData] = useState({})

  const handleSearch = (e) => {
    setCity(e.target.value)
  }

  const fetchData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=630ec6679e5afaa746a4d818be324ae1&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      setData(data)
    })
  }

  return (
    <div className="App">
      <section>
        <form>
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Enter Location" value={City} onChange={handleSearch} onKeyDown={fetchData} />
        </form>
      </section>
      <section>
        <h1>{data.name}</h1>
        {data.weather ? <p className="Description">{data.weather[0].main}</p> : null }
        {/* <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" /> */}
        {data.main ? <h3>{data.main.temp} °C</h3> : null}
        <div>
        { data.main ? <p>Min : {data.main.temp_min.toFixed()} °C</p> : null }
        { data.main ? <p>Max : {data.main.temp_max.toFixed()} °C</p> : null }
        </div>
      </section>
      <section>
        <div>
          <figure>
            <i class="fa-solid fa-temperature-half"></i>
            <figcaption>
              <p>Real Feel</p>
              { data.main ? <p>{data.main.feels_like.toFixed()} °C</p> : null }
            </figcaption>
          </figure>
          <figure>
            <i class="fa-solid fa-droplet"></i>
            <figcaption>
              <p>Humidity</p>
              { data.main ? <p>{data.main.humidity.toFixed()} %</p> : null }
            </figcaption>
          </figure>
        </div>
        <div>
          <figure>
            <i class="fa-solid fa-wind"></i>
            <figcaption>
              <p>Wind</p>
              { data.wind ? <p>{data.wind.speed.toFixed()} m/s</p> : null }
            </figcaption>
          </figure>
          <figure>
            <i class="fa-solid fa-gauge"></i>
            <figcaption>
              <p>Pressure</p>
              { data.main ? <p>{data.main.pressure.toFixed()} hPa </p> : null }
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

export default App;
