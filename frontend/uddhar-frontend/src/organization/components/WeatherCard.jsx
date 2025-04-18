import {typhoon} from "../../assets/Assests";

const weatherData = {
    currentTemp: 3.5,
    humidity: 95,
    pressure: 979.3,
    windSpeed: 28.8,
    sunrise: "8:41:58 AM",
    sunset: "4:57:41 PM",
    forecast: [
      { day: "TUE", max: 4.2, min: -1.6, icon: "", rain: 0.4 },
      { day: "WED", max: 4.2, min: -2, icon: "cloud.png", rain: 0.8 },
      { day: "THU", max: 5, min: 1.3, icon: "partly-cloudy.png", rain: 7.2 },
      { day: "FRI", max: 1.5, min: -2.5, icon: "sunny.png", rain: 0.7 },
      { day: "SAT", max: -0.4, min: -4.6, icon: "cloudy.png", rain: 0.0 },
    ],
};

const WeatherCard = () => {
    return (
      <div className="bg-blue-200 bg-opacity-50 p-6 rounded-xl shadow-md w-115 h-80 text-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={typhoon} alt="weather" className="w-10" />
            <h2 className="text-xl font-semibold">Forecast</h2>
          </div>
          <span className="text-3xl font-bold">{weatherData.currentTemp}°C</span>
        </div>
        <div className="text-sm text-gray-800 mt-2">
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <p>Wind: {weatherData.windSpeed} km/h</p>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div
              key={day.day}
              className="flex flex-col items-center bg-blue-300 bg-opacity-50 p-2 rounded-lg shadow"
            >
              <span className="font-semibold">{day.day}</span>
              <img src={`/icons/${day.type}`} alt={day.day} className="w-8 h-8" />
              <span className="text-sm">{day.max}°C</span>
              <span className="text-xs text-gray-700">{day.min}°C</span>
              <span className="text-xs">🌧 {day.rain} mm</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WeatherCard;