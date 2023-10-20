import './App.css';
import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import './assets/search.png';

//import for app icons
import search_icon from './assets/search.png';
import wind_icon from './assets/wind.png';
import humidity_icon from './assets/humidity.png';

//import for weather icons
import icon01 from './assets/icon01.png';
import icon02 from './assets/icon02.png';
import icon03 from './assets/icon03.png';
import icon04 from './assets/icon04.png';
import icon09 from './assets/icon09.png';
import icon10 from './assets/icon10.png';
import icon11 from './assets/icon11.png';
import icon13 from './assets/icon13.png';
import icon50 from './assets/icon50.png';


const App = () => {
  const [inputLocation, setInputLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});

  const handleOnChange = (event) => {
    const value = event.target.value;
    setInputLocation(value);
    console.log(value);
  };

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&APPID=0983b2f9cf98d7517e82a072b6c96ae6&units=metric`;


  const handleSearch = async () => {
    //aici va fi API care se va transmite la onClick la button
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      console.log(data);

      //setam aici valoarea care am scos-o din API si acum deja valorile sunt transpuse in weatherData si putem sa le afisam unde dorim
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }

    //aici undeva trebuie de chemat acea functie care am sters care se chema din start automat
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0983b2f9cf98d7517e82a072b6c96ae6&units=metric`);
        const data = await response.json();

        // Set the weather data to the state
        setWeatherData(data);
      });
    } else {
      /* geolocation IS NOT available */
    }
  }, []);

  const weatherIcon = () => {
    const weatherCode = weatherData.weather[0].icon;
    if (weatherCode === '01d' || weatherCode === '01n') {
      return icon01;
    } else if (weatherCode === '02d' || weatherCode === '02n') {
      return icon02;
    } else if (weatherCode === '03d' || weatherCode === '03n') {
      return icon03;
    } else if (weatherCode === '04d' || weatherCode === '04n') {
      return icon04;
    } else if (weatherCode === '09d' || weatherCode === '09n') {
      return icon09;
    } else if (weatherCode === '10d' || weatherCode === '10n') {
      return icon10;
    } else if (weatherCode === '11d' || weatherCode === '11n') {
      return icon11;
    } else if (weatherCode === '13d' || weatherCode === '13n') {
      return icon13;
    } else if (weatherCode === '50d' || weatherCode === '50n') {
      return icon50;
    } else {
      // Handle unrecognized weather codes by returning a default image source
      return 'Unrecognized weather. Review available assets and add proper icon!';
    }
  };

  return (
    <div>
      <div className='container'>
        <div className="top-bar">
          <input type="text"
            className="cityInput"
            placeholder='Search...'
            onChange={handleOnChange} />
          <button className="search-icon" onClick={handleSearch}>
            <img src={search_icon} alt="" />
          </button>
        </div>

        <div className="weather-image">
          <img src={weatherIcon} alt="" />
        </div>

        {/* below we check if weatherData.main exists before rendering the elements that depend on it. This will prevent the error from occurring when weatherData is initially undefined. Otherwise we get an error because initially weather data in useState is empty(undefined) */}
        {weatherData.main && (
          <>
            <div className="weather-temp">{Math.floor(weatherData.main.temp)}°C</div>
            <div className="weather-location">{weatherData.name}</div>

            <div className="data-container">
              <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                  <div className="humidity-percentage">{weatherData.main.humidity} %</div>
                  <div className="text">Humidity</div>
                </div>
              </div>

              <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                  <div className="wind-rate">{weatherData.wind.speed} km/h</div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;