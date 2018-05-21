import { Cartesian3 } from 'angular-cesium';

export interface SatDatum {
  position: Cartesian3;
  value: number;
}

export interface Measurment {
  date: Date;
  minHumidity: number;
  maxHumidity: number;
  minTemperture: number;
  maxTemperture: number;
}

export interface City {
  id: string;
  name: string;
  position: Cartesian3;
  measurements: Measurment[];
}

export interface Area {
  name: string;
  hierarchy: Cartesian3[];
}

export interface Alert {
  color: string;
  areas: Area[];
}
