import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TransactionsService } from '../transactions.service';

@Component({
  selector: "app-transactions-window",
  templateUrl: "./transactions-window.component.html",
  styleUrls: ["./transactions-window.component.css"],
})
export class TransactionsWindowComponent {
  @Input() address: string;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(public transactionService: TransactionsService) {}

  close() {
    this.onClose.emit();
  }
}
