import React, { useState } from 'react';
import './WeatherApp.css';
import '../Assets/search.png';

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp = () => {
    const [inputLocation, setInputLocation] = useState('');

    const handleOnInput = (event) => {
        const value = event.target.value;
        setInputLocation(value);
        console.log(value);
    }

    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0983b2f9cf98d7517e82a072b6c96ae6';

    const fetchData = async () => {
        try {

            const response = await fetch(endpoint);
            const data = await response.json();
            
                console.log(data);
            } catch(error) {
                console.log(error);
        }
    }

    fetchData();


    const handleSearch = () => {
        //aici va fi API care se va transmite la onClick la button
    }



    return (
        <div>
            <div className='container'>
                <div className="top-bar">
                    <input type="text"
                        className="cityInput"
                        placeholder='Search...'
                        onInput={handleOnInput} />
                    <button className="search-icon" onClick={handleSearch}>
                        <img src={search_icon} alt="" />
                    </button>
                </div>

                <div className="weather-image">
                    <img src={drizzle_icon} alt="" />
                </div>
                <div className="weather-temp">24 °C</div>
                <div className="weather-location">London</div>

                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percentage">69 %</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>

                    <div className="element">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">80 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
