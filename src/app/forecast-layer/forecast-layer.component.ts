import { get } from 'lodash';
import * as moment from 'moment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AcNotification, ActionType, AcEntity, Cartesian3, AcLayerComponent } from 'angular-cesium';

import { NetworkService } from '../common/network/network.service';
import { map, flatMap, tap, merge } from 'rxjs/operators';
import { Forecast, DayForecast } from './forecast';
import { UtilsService } from '../common/utils/utils.service';
import { StateService, ForecastStateType } from '../common/state/state.service';

const FAR_LIMIT_IN_METERS = 1250000;

@Component({
  selector: 'app-forecast-layer',
  templateUrl: './forecast-layer.component.html',
})
export class ForecastLayerComponent implements OnInit {
  scaleByDistance = new Cesium.NearFarScalar(10000, 1.2, FAR_LIMIT_IN_METERS, 0.6);
  distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, FAR_LIMIT_IN_METERS);
  cities$: Observable<AcNotification>;
  forecastState = ForecastStateType.TEMPERTURE;

  @ViewChild(AcLayerComponent) layer: AcLayerComponent;

  forecastCitiesData = [];

  constructor(private network: NetworkService, private utils: UtilsService, private state: StateService) {
  }

  ngOnInit() {
    this.cities$ = this.network
      .getForecast()
      .pipe(
        map(Forecast.lift),
        flatMap(forecast => Observable.from(forecast && forecast.cities && forecast.cities.map(this.utils.toNotificationsIterator))),
        tap(forcastNotification => this.forecastCitiesData.push(forcastNotification))
      );

    this.state.forcastState$.subscribe(fs => {
      this.forecastState = fs;
      this.layer.refreshAll(this.forecastCitiesData);
    });
  }

  getTemperture(dayForecast: DayForecast) {
    return `${dayForecast.maxTemperture}° - ${dayForecast.minTemperture}°`;
  }

  getHumidity(dayForecast: DayForecast) {
    return `${dayForecast.minHumidity}`;
  }

  showTemperture() {
    console.log('checking temp');
    return this.forecastState === ForecastStateType.TEMPERTURE;
  }

  showHumidity() {
    console.log('checking humidity');
    return this.forecastState === ForecastStateType.HUMIDITY;
  }
}
