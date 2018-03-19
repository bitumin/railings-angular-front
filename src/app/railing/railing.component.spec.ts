import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailingComponent } from './railing.component';

describe('RailingComponent', () => {
  let component: RailingComponent;
  let fixture: ComponentFixture<RailingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
