import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=bf266ec499f78c9c77ceab370f7faa8b&units=metric`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        alert('Location not found');
      } else {
        alert('An error occurred');
      }
      console.error('Error fetching the weather data:', error);
    });
    setLocation('');
  };


  const getLocalTime = (timezoneOffset) => {
    const localTime = new Date(new Date().getTime() + timezoneOffset * 1000);
    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    };
    return localTime.toLocaleString(undefined, options);
  };

  return (
    <div className='weather'>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          
          placeholder='Enter Location'
          type="text"
        />
        <button type="button" className="btn btn-style" onClick={searchLocation}>Search</button>
        
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1>:null}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].description}</p>}
          </div>
          <div className="time">
            {data.timezone && <p className='bold'>{getLocalTime(data.timezone)} UTC</p>}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
