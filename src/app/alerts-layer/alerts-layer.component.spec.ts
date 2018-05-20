import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsLayerComponent } from './alerts-layer.component';

describe('AlertsLayerComponent', () => {
  let component: AlertsLayerComponent;
  let fixture: ComponentFixture<AlertsLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
