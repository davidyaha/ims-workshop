import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatDataLayerComponent } from './sat-data-layer.component';

describe('SatDataLayerComponent', () => {
  let component: SatDataLayerComponent;
  let fixture: ComponentFixture<SatDataLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatDataLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatDataLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
