import React, { useState } from 'react';

const API = {
  key: "1286e9281a999915b30c476f5db271c0",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${API.base}weather?q=${query}&units=metric&lang=es&APPID=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
      "Junio", "Julio", "Agosto", "Septiembre", 
      "Octubre", "Noviembre", "Diciembre"
    ];
    let days = [
      "Domingo", "Lunes", "Martes", "Miércoles", 
      "Jueves", "Viernes", "Sábado"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let fecha = day +", "+ date +" "+ month +" "+ year;

    return fecha;
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input 
            type="text" 
            className='search-bar' 
            placeholder='Buscar...' 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className='contenedor'>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
        
          <div className='weather-box'>
            <div className="temp">
              {Math.round(weather.main.temp)}ºC
            </div>
            <div className="weather">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
