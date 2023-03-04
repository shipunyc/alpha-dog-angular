import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolManagementComponent } from './pool-management.component';

describe('PoolManagementComponent', () => {
  let component: PoolManagementComponent;
  let fixture: ComponentFixture<PoolManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
