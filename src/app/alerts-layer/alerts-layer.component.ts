import { get } from 'lodash';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AcNotification, ActionType, AcEntity } from 'angular-cesium';
import { NetworkService } from '../common/network/network.service';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Alert } from './alert';
import { map, flatMap } from 'rxjs/operators';
import { UtilsService } from '../common/utils/utils.service';

@Component({
  selector: 'app-alerts-layer',
  templateUrl: './alerts-layer.component.html',
})
export class AlertsLayerComponent implements OnInit {
  polygons$: Observable<AcNotification>;
  alert$: Observable<Alert>;

  constructor(private network: NetworkService, private utils: UtilsService) {}

  ngOnInit() {
    this.alert$ = this.network.getAlert().pipe(map(Alert.lift));

    this.polygons$ = this.alert$.pipe(
      flatMap(alert =>
        Observable.from(
          alert.areas.map(this.utils.toNotificationsIterator),
        ),
      ),
    );
  }

  getAlertColor() {
    return Cesium.Color.ORANGE;
  }
}
