import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Cesium polyfill
Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/');
Cesium.BingMapsApi.defaultKey = 'AtIXLwI-EOgRtuDna0r-bcIAfj7G_cN6fb98u3A1DbgEEW-SquLhxEi8KnGrlJkA';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
