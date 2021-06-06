import logo from './logo.svg';
import Weather from './components/AppComponent.jsx';
import Form from './components/FormComponent.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      temp: undefined,
      minTemp: undefined,
      description: undefined,
      maxTemp: undefined,
      icon: undefined,
      humidity: undefined,
      pressure: undefined,
      wind: undefined,
      error: false
    };

    this.weatherIcon = {
      thunderstorm: "wi wi-day-sunny display-1",
      drizzle: "wi wi-sleet display-1",
      rain: "wi wi-storm-showers display-1",
      snow: "wi wi-snow display-1",
      atmosphere: "wi wi-fog display-1",
      clear: "wi wi-day-sunny display-1",
      clouds: "wi wi-day-fog display-1"
    };
  }

  calculateTemp(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getIcons(icon, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232: this.setState({ icon: this.weatherIcon.thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321: this.setState({ icon: this.weatherIcon.drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531: this.setState({ icon: this.weatherIcon.rain });
        break;
      case rangeId >= 600 && rangeId <= 622: this.setState({ icon: this.weatherIcon.snow });
        break;
      case rangeId >= 701 && rangeId <= 781: this.setState({ icon: this.weatherIcon.atmosphere });
        break;
      case rangeId == 800: this.setState({ icon: this.weatherIcon.clear });
        break;
      case rangeId >= 801 && rangeId <= 804: this.setState({ icon: this.weatherIcon.clouds });
        break;
      default: this.setState({ icon: this.weatherIcon.clouds });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    var city = e.target.elements.city.value;
    var country = e.target.elements.country.value;


    var API_key = "c73650c983007a803abd8dd5c4b0c568";
    if (city && country) {
      const apiCall = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + API_key);



      const response = await apiCall.json();
      console.log(response);
      this.setState({
        city: response.name,
        country: response.sys.country,
        temp: this.calculateTemp(response.main.temp),
        minTemp: this.calculateTemp(response.main.temp_min),
        maxTemp: this.calculateTemp(response.main.temp_max),
        description: response.weather[0].main,
        wind: response.wind.speed,
        pressure: response.main.pressure,

        error: false

      });
      this.getIcons(this.weatherIcon, response.weather[0].id);

    } else {
      this.setState({ error: true });
    }
  };
  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          minTemp={this.state.minTemp}
          maxTemp={this.state.maxTemp}
          description={this.state.description}
          icon={this.state.icon}
          wind={this.state.wind}
          pressure={this.state.pressure}

        />

      </div>
    )
  }
}



export default App;
