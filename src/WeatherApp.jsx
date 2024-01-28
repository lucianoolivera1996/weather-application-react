import { useState } from "react"

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '0a39c3306593b1335a6d23d4674841fc'
  const diffKelvin = 273.15


  const [city, setCity] = useState('')
  const [weatherInfo, setWeatherInfo] = useState(null)

  const handleCityInput = ({ target }) => {
    setCity(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
      const weatherInfo = await response.json()
      console.log(weatherInfo)
      setWeatherInfo(weatherInfo)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityInput} />
        <button type="submit">Search</button>
      </form>

      {
        weatherInfo && (
          <div>
            <h2>{weatherInfo.name}</h2>
            <p>Temp: {parseInt(weatherInfo.main.temp-diffKelvin)} °C</p>
            <p>Info: {weatherInfo.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
          </div>
        )
      }

    </div>
  )
}
