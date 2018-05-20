import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastLayerComponent } from './forecast-layer.component';

describe('ForecastLayerComponent', () => {
  let component: ForecastLayerComponent;
  let fixture: ComponentFixture<ForecastLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
