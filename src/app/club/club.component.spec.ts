import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnPoolComponent } from './earn-pool.component';

describe('EarnPoolComponent', () => {
  let component: EarnPoolComponent;
  let fixture: ComponentFixture<EarnPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
