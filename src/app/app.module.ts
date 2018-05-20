import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularCesiumModule } from 'angular-cesium';

import { AppComponent } from './app.component';
import { SatDataLayerComponent } from './sat-data-layer/sat-data-layer.component';
import { ForecastLayerComponent } from './forecast-layer/forecast-layer.component';
import { AlertsLayerComponent } from './alerts-layer/alerts-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    SatDataLayerComponent,
    ForecastLayerComponent,
    AlertsLayerComponent
  ],
  imports: [
    BrowserModule,
    AngularCesiumModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
