import { Injectable } from '@angular/core';
import { SatDatum } from './types';

const dataUrl = '/assets/data';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor() {}

  getForecast() {
    return fetch(dataUrl + '/isr-cities.json').then(r => r.json());
  }

  async getSatData() {
    const satCsv = await fetch(dataUrl + '/sat-data.csv').then(r => r.text());
    return satCsv.split('\n').map(row => {
      const [lat, lon, value] = row.split(',');
      const position = Cesium.Cartesian3.fromDegrees(lon, lat);
      return { position, value: Number(value) };
    });
  }

  getAlert(): Promise<SatDatum[]> {
    return fetch(dataUrl + '/isr-170209-141553-1183.json').then(r => r.json());
  }
}
