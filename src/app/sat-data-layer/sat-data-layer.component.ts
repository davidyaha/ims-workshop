import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from '../common/network/network.service';
import { scale } from 'chroma-js';
import { AcNotification, AcEntity, ActionType } from 'angular-cesium';
import { map, flatMap } from 'rxjs/operators';
import { SatData } from './sat-data';
import { UtilsService } from '../common/utils/utils.service';

const colorScale = scale(['purple', 'blue', 'lightblue', 'yellow', 'darkorange', 'darkred'])
  .domain([-70, -40, -5, 5, 30, 55]);

@Component({
  selector: 'app-sat-data-layer',
  templateUrl: './sat-data-layer.component.html',
})
export class SatDataLayerComponent implements OnInit {
  satData$: Observable<AcNotification>;

  constructor(private network: NetworkService, private utils: UtilsService) {}

  ngOnInit() {
    this.satData$ = this.network
      .getSatData()
      .pipe(map(SatData.lift))
      .pipe(flatMap(
        satData => Observable.from(
          satData.items.map(this.utils.toNotificationsIterator)
        )
      ));
  }

  public getPointColor(degreeValue: number) {
    const color = colorScale(degreeValue).rgb().map(v => v / 255);
    return new Cesium.Color(...color);
  }
}
