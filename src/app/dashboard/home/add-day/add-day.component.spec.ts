/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDayComponent } from './add-day.component';

describe('AddDayComponent', () => {
  let component: AddDayComponent;
  let fixture: ComponentFixture<AddDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
