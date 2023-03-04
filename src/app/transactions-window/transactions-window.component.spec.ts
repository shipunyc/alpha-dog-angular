import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactionsWindowComponent } from "./transactions-window.component";

describe("AlertMessageComponent", () => {
  let component: TransactionsWindowComponent;
  let fixture: ComponentFixture<TransactionsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsWindowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
