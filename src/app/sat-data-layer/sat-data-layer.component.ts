import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SatDatum } from '../common/network/types';
import { NetworkService } from '../common/network/network.service';
import { scale } from 'chroma-js';
import { AcNotification, AcEntity, ActionType } from 'angular-cesium';

const colorScale = scale(['purple', 'blue', 'lightblue', 'yellow', 'darkorange', 'darkred'])
  .domain([-70, -40, -5, 5, 30, 55]);

@Component({
  selector: 'app-sat-data-layer',
  templateUrl: './sat-data-layer.component.html',
  styleUrls: ['./sat-data-layer.component.css'],
})
export class SatDataLayerComponent implements OnInit {
  satData$: Subject<AcNotification> = new Subject<AcNotification>();

  constructor(private network: NetworkService) {}

  ngOnInit() {
    this.network
      .getSatData()
      .then(data =>
        data.map((datum, i) => ({
          id: String(`sat-${i}`),
          entity: new AcEntity(datum),
          actionType: ActionType.ADD_UPDATE,
        })),
      )
      .then(ns =>
        ns.forEach(n => {
          this.satData$.next(n);
        }),
      );
  }

  public getPointColor(degreeValue: number) {
    const color = colorScale(degreeValue).rgb().map(v => v / 255);
    return new Cesium.Color(...color);
  }
}