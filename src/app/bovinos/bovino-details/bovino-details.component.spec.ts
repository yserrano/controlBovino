import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bovinoDetailsComponent } from './bovino-details.component';

describe('bovinoDetailsComponent', () => {
  let component: bovinoDetailsComponent;
  let fixture: ComponentFixture<bovinoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bovinoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bovinoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
