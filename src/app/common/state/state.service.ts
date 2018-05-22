import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ForecastStateType {
  HUMIDITY,
  TEMPERTURE,
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  forcastState$: BehaviorSubject<ForecastStateType> = new BehaviorSubject(ForecastStateType.TEMPERTURE);
  forcastState: ForecastStateType = ForecastStateType.TEMPERTURE;

  constructor() {}

  toggleForcast() {
    this.forcastState =
      this.forcastState === ForecastStateType.TEMPERTURE ? ForecastStateType.HUMIDITY : ForecastStateType.TEMPERTURE;
    this.forcastState$.next(this.forcastState);
  }
}
