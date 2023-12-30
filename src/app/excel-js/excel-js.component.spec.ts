import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelJSComponent } from './excel-js.component';

describe('ExcelJSComponent', () => {
  let component: ExcelJSComponent;
  let fixture: ComponentFixture<ExcelJSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelJSComponent]
    });
    fixture = TestBed.createComponent(ExcelJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
