import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryVisualizerComponent } from './geometry-visualizer.component';

describe('GeometryVisualizerComponent', () => {
  let component: GeometryVisualizerComponent;
  let fixture: ComponentFixture<GeometryVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeometryVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometryVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
