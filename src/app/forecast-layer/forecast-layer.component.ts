import { get } from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AcNotification, ActionType, AcEntity, Cartesian3 } from 'angular-cesium';

import { NetworkService } from '../common/network/network.service';
import { map, flatMap, tap } from 'rxjs/operators';
import { Forecast, DayForecast } from './forecast';
import { UtilsService } from '../common/utils/utils.service';

const FAR_LIMIT_IN_METERS = 1250000;
@Component({
  selector: 'app-forecast-layer',
  templateUrl: './forecast-layer.component.html',
})
export class ForecastLayerComponent implements OnInit {
  scaleByDistance = new Cesium.NearFarScalar(10000, 1.2, FAR_LIMIT_IN_METERS - 10000, 0);
  distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, FAR_LIMIT_IN_METERS);
  cities$: Observable<AcNotification>;

  constructor(private network: NetworkService, private utils: UtilsService) {}

  ngOnInit() {
    this.cities$ = this.network
      .getForecast()
      .pipe(map(Forecast.lift))
      .pipe(flatMap(
        forecast => Observable.from(
          forecast.cities.map(this.utils.toNotificationsIterator)
        )
      ));
  }

  getForecastText(dayForecast: DayForecast) {
    return `${dayForecast.maxTemperture}° - ${dayForecast.minTemperture}°`;
  }
}
