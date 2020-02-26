import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCabinetComponent } from './cabinet.component';

describe('TableBasicFlexExampleComponent', () => {
  let component: UsersCabinetComponent;
  let fixture: ComponentFixture<UsersCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCabinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
