const dataUrl = '/assets/data';

export class NetworkService {
  getForecast() {
    return fetch(dataUrl + '/isr-cities.json').then(r => r.json());
  }

  async getSatData() {
    const satCsv = await fetch(dataUrl + '/sat-dat.csv').then(r => r.text());
    return satCsv.split('\\n').map(row => {
      const [lat, lon, value] = row.split(',');
      return { lat, lon, value };
    });
  }

  getAlert() {
    return fetch(dataUrl + '/isr-170209-141553-1183.json').then(r => r.json());
  }
}
