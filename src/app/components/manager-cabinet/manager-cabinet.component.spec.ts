import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCabinetComponent } from './manager-cabinet.component';

describe('AdminCabinetComponent', () => {
  let component: ManagerCabinetComponent;
  let fixture: ComponentFixture<ManagerCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
