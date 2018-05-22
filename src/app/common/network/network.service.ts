import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const dataUrl = '/assets/data';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  getForecast() {
    return this.http.get(dataUrl + '/isr-cities.json');
  }

  getSatData() {
    return this.http.get(dataUrl + '/sat-data.csv', { responseType: 'text' });
  }

  getAlert() {
    return this.http.get(dataUrl + '/isr-170209-141553-1183.json');
  }
}
