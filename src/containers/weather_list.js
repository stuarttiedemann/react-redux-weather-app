import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const kelvinTemps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    function convertToFahrenheit(temp) {
      return Math.floor(9 / 5 * (temp -273.15) + 32);
    };

    const temps = kelvinTemps.map(convertToFahrenheit);

    console.log(temps);
    return (
      <tr key={name}>
        <td>{name}</td>
        <td><Chart data={temps} color="orange" units="F" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="black" units="%" /></td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

// ES5 way of doing it
// function mapStateToProps(state) {
//   return { weather: state.weather };
// }

// ES6 way of refactoring 
function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps) (WeatherList);