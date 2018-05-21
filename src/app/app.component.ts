import { Component } from '@angular/core';
import { MapLayerProviderOptions, ViewerConfiguration, SceneMode } from 'angular-cesium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  arcGisMapServerProvider = MapLayerProviderOptions.ArcGisMapServer;
  homeLocation = { destination: Cesium.Cartesian3.fromDegrees(34.76, 32.1, 2000000) };

  constructor(private viewerConf: ViewerConfiguration) {
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
}
