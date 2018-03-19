import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailingsListComponent } from './railings-list.component';

describe('RailingsListComponent', () => {
  let component: RailingsListComponent;
  let fixture: ComponentFixture<RailingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
