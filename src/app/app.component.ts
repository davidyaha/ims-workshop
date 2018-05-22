import { Component } from '@angular/core';
import { MapLayerProviderOptions, ViewerConfiguration, SceneMode } from 'angular-cesium';
import { StateService, ForecastStateType } from './common/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  arcGisMapServerProvider = MapLayerProviderOptions.ArcGisMapServer;
  homeLocation = { destination: Cesium.Cartesian3.fromDegrees(34.76, 32.1, 2000000) };

  constructor(private viewerConf: ViewerConfiguration, private state: StateService) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: true,
      navigationInstructionsInitiallyVisible: false,
      animation: false,
      baseLayerPicker: false,
      sceneMode: SceneMode.SCENE2D,
    };
  }

  toggleForcast() {
    this.state.toggleForcast();
  }
}
