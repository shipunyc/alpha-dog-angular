import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCoverComponent } from './get-cover.component';

describe('GetCoverComponent', () => {
  let component: GetCoverComponent;
  let fixture: ComponentFixture<GetCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
