import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { bovinoListComponent } from './bovino-list.component';

describe('bovinoListComponent', () => {
  let component: bovinoListComponent;
  let fixture: ComponentFixture<bovinoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bovinoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(bovinoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
