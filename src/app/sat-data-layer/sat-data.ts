import { AcEntity, Cartesian3 } from 'angular-cesium';

export class SatData extends AcEntity {
  items: SatDatum[];

  static lift(data: string): SatData {
    const satData = new SatData();
    satData.items = data.split('\n').map(SatDatum.lift);
    return satData;
  }
}

export class SatDatum extends AcEntity {
  position: Cartesian3;
  value: number;

  static lift(data: string): SatDatum {
    const datum = new SatDatum();
    const [lat, lon, value] = data.split(',');
    datum.position = Cesium.Cartesian3.fromDegrees(lon, lat);
    datum.value = Number(value);
    return datum;
  }
}
