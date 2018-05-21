import { get } from 'lodash';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AcNotification, ActionType, AcEntity } from 'angular-cesium';
import { NetworkService } from '../common/network/network.service';
import { Alert, Area } from '../common/network/types';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-alerts-layer',
  templateUrl: './alerts-layer.component.html',
  styleUrls: ['./alerts-layer.component.css'],
})
export class AlertsLayerComponent implements OnInit {
  polygons$: Subject<AcNotification> = new Subject();
  alert$: Subject<Alert> = new Subject();

  constructor(private network: NetworkService) {}

  ngOnInit() {
    this.network
      .getAlert()
      .then(this.transform)
      .then(alert => this.alert$.next(alert));
    this.alert$.subscribe(alert => {
      alert.areas.forEach((area, i) =>
        this.polygons$.next({
          id: String(i),
          actionType: ActionType.ADD_UPDATE,
          entity: new AcEntity(area),
        }),
      );
    });
  }

  transform(alert: any): Alert {
    return {
      color: Cesium.Color.ORANGE,
      areas: get(alert, 'alert.info.area', []).map(
        area =>
          ({
            name: area.areaDesc,
            hierarchy: area.polygon.split(' ').map(coords => Cesium.Cartesian3.fromDegrees(...coords.split(',').reverse())),
          } as Area),
      ),
    };
  }

  getAlertColor() {
    return Cesium.Color.ORANGE;
  }
}
