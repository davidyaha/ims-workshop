import { get } from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AcNotification, ActionType, AcEntity, Cartesian3 } from 'angular-cesium';

import { NetworkService } from '../common/network/network.service';
import { City } from '../common/network/types';

@Component({
  selector: 'app-forecast-layer',
  templateUrl: './forecast-layer.component.html',
  styleUrls: ['./forecast-layer.component.css'],
})
export class ForecastLayerComponent implements OnInit {
  cities$: Subject<AcNotification> = new Subject();

  constructor(private network: NetworkService) {}

  ngOnInit() {
    this.network
      .getForecast()
      .then(this.transform)
      .then(cities => cities.forEach(city => this.cities$.next(city)));
  }

  transform(forcast: any): AcNotification[] {
    const locations = get(forcast, 'IsraelCitiesWeatherForecastMorning.Location', []);

    return locations.map((l, i) => {
      const entity: City = {
        id: get(l, 'LocationMetaData.LocationId', i),
        name: get(l, 'LocationMetaData.LocationNameEng'),
        position: Cesium.Cartesian3.fromDegrees(
          get(l, 'LocationMetaData.DisplayLon'),
          get(l, 'LocationMetaData.DisplayLat'),
        ),
        measurements: get(l, 'LocationData.TimeUnitData', []).map(m => ({
          date: moment(m.Date, 'YYYY-MM-DD'),
          minHumidity: get(m.Element.find(e => e.ElementName === 'Minimum relative humidity'), 'ElementValue'),
          maxHumidity: get(m.Element.find(e => e.ElementName === 'Maximum relative humidity'), 'ElementValue'),
          minTemperture: get(m.Element.find(e => e.ElementName === 'Minimum temperature'), 'ElementValue'),
          maxTemperture: get(m.Element.find(e => e.ElementName === 'Maximum temperature'), 'ElementValue'),
        })),
      };
      return {
        id: entity.id,
        actionType: ActionType.ADD_UPDATE,
        entity: new AcEntity(entity),
      };
    });
  }

  getLabelPosition(origin: Cartesian3, line: number = 1): Cartesian3 {
    const delta = new Cesium.Cartesian3(0.0, 0.0, 0.0);
    return Cesium.Cartesian3.add(origin, delta, new Cesium.Cartesian3());
  }
}
