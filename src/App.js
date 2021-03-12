import {useEffect,useState} from 'react';

import './App.css';

function App() {


  const [weatherInfo,setWeatherInfo] = useState({});
  const [location,setLocation] = useState('London');
  const [city,setCity] = useState('');


  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=61e4413a29ce4ad89df174532211103&q=${location!==''?location:"Bursa"}&days=3&aqi=no&alerts=no`)
      .then((res)=>res.json())
      .then((data)=>setWeatherInfo(data))
  }, [location])


  function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

  return(
<>

    {weatherInfo.current&&(

<div className="all">

    <div className="uptwo">


    <div className="current">

      <h2>{location}</h2>
      <h4>Current temperature {weatherInfo.current.temp_c} <span>&#8451;</span></h4>

    </div>    

    <div className="inputs">
      <input class="css-input" placeholder = "City name"  onChange={(e)=>setCity(e.target.value)}/>
      <button id="myButton" onClick={()=>setLocation(city)}>Get Weather!</button>
    </div>  

      </div>

    <div className="container">

      <div className="today"  >
      <h4> Today {weatherInfo.forecast.forecastday[0].day.avgtemp_c} <span>&#8451;</span></h4>
      <h4>{weatherInfo.current.condition.text}</h4>
      <img src={weatherInfo.current.condition.icon}/>
      

      </div>

      <div className="tomorrow">

      
      <h4> Tomorrow { weatherInfo.forecast.forecastday[1].day.avgtemp_c} <span>&#8451;</span></h4>      
      <h4>{weatherInfo.forecast.forecastday[1].day.condition.text}</h4>
      <img src = {weatherInfo.forecast.forecastday[1].day.condition.icon}/>

      </div>

      <div  className="dayafter">

      <h4> {getDayName((weatherInfo.forecast.forecastday[2].date),'en-US')} { weatherInfo.forecast.forecastday[2].day.avgtemp_c} <span>&#8451;</span></h4>      
      <h4>{weatherInfo.forecast.forecastday[2].day.condition.text}</h4>
      <img src = {weatherInfo.forecast.forecastday[2].day.condition.icon}/>

      </div>

      </div>

  </div>  
    )
    }
  </>
)

  }
export default App;