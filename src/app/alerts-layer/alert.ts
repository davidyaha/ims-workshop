import { get } from 'lodash';
import { AcEntity, Cartesian3 } from 'angular-cesium';

export class Alert extends AcEntity {
  color: string;
  areas: Area[];

  static lift(data: object) {
    const alert = new Alert();
    alert.color = Cesium.Color.ORANGE;
    alert.areas = get(data, 'alert.info.area', []).map(Area.lift);
    return alert;
  }
}

export class Area extends AcEntity {
  name: string;
  hierarchy: Cartesian3[];

  static lift(data: object): Area {
    const area = new Area();
    area.name = get(data, 'areaDesc', '');
    area.hierarchy = get(data, 'polygon', '')
      .split(' ')
      .map(coords => Cesium.Cartesian3.fromDegrees(...coords.split(',').reverse()));
    return area;
  }
}