import PropTypes from "prop-types";

// create a dummy weather data for testing
const defaultData = {
  IsDayTime: true,
  LocalObservationDateTime: "2023-10-01T12:00:00+00:00",
  Temperature: {
    Metric: { Value: 25 },
  },
  WeatherText: "Sunny",
  WeatherIcon: 1,
  RealFeelTemperature: {
    Metric: { Value: 27 },
  },
  RelativeHumidity: 60,
  Wind: {
    Speed: {
      Metric: { Value: 15 },
    },
    Direction: {
      Localized: "NNE",
    },
  },
  UVIndex: 5,
  UVIndexText: "Moderate",
  Visibility: {
    Metric: { Value: 10 },
  },
  Pressure: {
    Metric: { Value: 1013 },
  },
  DewPoint: {
    Metric: { Value: 18 },
  },
  Link: "https://www.weather.com/",
};


const WeatherInfo = ({ weatherData = defaultData }) => {
  if (!weatherData?.Temperature) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-500 w-full h-50 flex justify-center items-center mb-5">
        <p className="text-gray-500">Weather data not available</p>
      </div>
    );
  }

  const data = weatherData;
  const isDayTime = data.IsDayTime;
  const cardBg = isDayTime ? "bg-blue-50" : "bg-gray-800 text-white";
  const textColor = isDayTime ? "text-gray-800" : "text-white";

  return (
    <div
      className={`rounded-lg shadow-md p-4 border ${cardBg} ${textColor} mb-5`}
    >
      {/* Header with location and time */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">Current Weather</h2>
          <p className="text-sm opacity-80">
            {new Date(data.LocalObservationDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold">
            {data.Temperature.Metric.Value}°C
          </span>
          <p className="text-sm">{data.WeatherText}</p>
        </div>
      </div>

      {/* Weather icon and feels like */}
      <div className="flex flex-col items-center justify-between mb-4 bg-blue-200 rounded-lg p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex flex-col items-centerjustify-center">
            <span className="text-4xl">
              {getWeatherIcon(data.WeatherIcon, isDayTime)}
            </span>
          </div>
          <div className="ml-2">
            <p className="text-sm">Feels like</p>
            <p className="text-lg font-semibold">
              {data.RealFeelTemperature.Metric.Value}°C
            </p>
          </div>
        </div>
      </div>

      {/* Additional weather details */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">💧 Humadity</span>
          <span>{data.RelativeHumidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">🌬️ Wind</span>
          <span>
            {data.Wind.Speed.Metric.Value} km/h {data.Wind.Direction.Localized}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">☀️ UV</span>
          <span>
            {data.UVIndex} ({data.UVIndexText})
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">👁️ Visibility</span>
          <span>{data.Visibility.Metric.Value} km</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">📊 Pressure</span>
          <span>{data.Pressure.Metric.Value} mb</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mr-2">🌡️ Dew Point</span>
          <span>{data.DewPoint.Metric.Value}°C</span>
        </div>
      </div>

      {/* Footer with link */}
      <div className="mt-4 pt-2 border-t border-opacity-20">
        <a
          href={data.Link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:underline"
        >
          More details
        </a>
      </div>
    </div>
  );
};

const getWeatherIcon = (iconCode, isDayTime) => {
  const icons = {
    1: isDayTime ? "☀️" : "🌙", // Sunny/Clear
    2: isDayTime && "🌤️", // Mostly Sunny
    3: isDayTime && "⛅", // Partly Sunny
    4: "☁️", // Cloudy
    5: "🌫️", // Hazy
    6: "🌫️", // Mostly Cloudy
    7: "☁️", // Overcast
  };
  return icons[iconCode] || "🌡️";
};

export default WeatherInfo;

WeatherInfo.propTypes = {
  weatherData: PropTypes.shape({
    IsDayTime: PropTypes.bool,
    LocalObservationDateTime: PropTypes.string,
    Temperature: PropTypes.shape({
      Metric: PropTypes.shape({
        Value: PropTypes.number,
      }),
    }),
    WeatherText: PropTypes.string,
    WeatherIcon: PropTypes.number,
    RealFeelTemperature: PropTypes.shape({
      Metric: PropTypes.shape({
        Value: PropTypes.number,
      }),
    }),
    RelativeHumidity: PropTypes.number,
    Wind: PropTypes.shape({
      Speed: PropTypes.shape({
        Metric: PropTypes.shape({
          Value: PropTypes.number,
        }),
      }),
      Direction: PropTypes.shape({
        Localized: PropTypes.string,
      }),
    }),
    UVIndex: PropTypes.number,
    UVIndexText: PropTypes.string,
    Visibility: PropTypes.shape({
      Metric: PropTypes.shape({
        Value: PropTypes.number,
      }),
    }),
    Pressure: PropTypes.shape({
      Metric: PropTypes.shape({
        Value: PropTypes.number,
      }),
    }),
    DewPoint: PropTypes.shape({
      Metric: PropTypes.shape({
        Value: PropTypes.number,
      }),
    }),
  }),
};
