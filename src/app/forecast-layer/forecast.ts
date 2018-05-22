import { get } from 'lodash';
import * as moment from 'moment';
import { AcEntity, Cartesian3 } from 'angular-cesium';

export class Forecast extends AcEntity {
  cities: CityForecast[];

  static lift(data: object): Forecast {
    const forecast = new Forecast();
    forecast.cities = get(data, 'IsraelCitiesWeatherForecastMorning.Location', []).map(CityForecast.lift);
    return forecast;
  }
}

export class CityForecast extends AcEntity {
  id: string;
  name: string;
  image = '/assets/marker.png';
  position: Cartesian3;
  dayForecast: DayForecast[];

  static lift(data: object): CityForecast {
    const cityForecast = new CityForecast();
    cityForecast.id = get(data, 'LocationMetaData.LocationId');
    cityForecast.name = get(data, 'LocationMetaData.LocationNameEng');
    cityForecast.position = Cesium.Cartesian3.fromDegrees(
      get(data, 'LocationMetaData.DisplayLon'),
      get(data, 'LocationMetaData.DisplayLat'),
    );
    cityForecast.dayForecast = get(data, 'LocationData.TimeUnitData', []).map(DayForecast.lift);
    return cityForecast;
  }
}

export class DayForecast extends AcEntity {
  date: Date;
  minHumidity: number;
  maxHumidity: number;
  minTemperture: number;
  maxTemperture: number;

  static lift(data: object): DayForecast {
    const dayForecast = new DayForecast();
    dayForecast.date = moment(get(data, 'Date'), 'YYYY-MM-DD').toDate();
    const forecastData = get(data, 'Element');

    dayForecast.minHumidity = get(
      forecastData.find(e => e.ElementName === 'Minimum relative humidity'),
      'ElementValue',
    );
    dayForecast.maxHumidity = get(
      forecastData.find(e => e.ElementName === 'Maximum relative humidity'),
      'ElementValue',
    );
    dayForecast.minTemperture = get(forecastData.find(e => e.ElementName === 'Minimum temperature'), 'ElementValue');
    dayForecast.maxTemperture = get(forecastData.find(e => e.ElementName === 'Maximum temperature'), 'ElementValue');

    return dayForecast;
  }
}
