import { Component, Input, Output, EventEmitter } from "@angular/core";
import { formatRate, formatBalance, formatDate, formatFixed } from '../utils';

@Component({
  selector: 'app-withdraw-history',
  templateUrl: './withdraw-history.component.html',
  styleUrls: ['./withdraw-history.component.css']
})
export class WithdrawHistoryComponent {
  @Input() withdrawRequests: any[];
  @Input() pool: {};
  @Input() waitWeeks: any;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;

  constructor() { }

  ngOnInit() {
  }

  formatDaysLeft(time) {
    const now = Math.floor(new Date().getTime() / 1000);
    const offset = 4 * 3600 * 24;
    const week = 7 * 3600 * 24;
    const day = 3600 * 24;

    return Math.max(0,
        Math.floor(((Math.floor((time * 1 + offset) / week) + this.waitWeeks) * week - offset - now) / day)
    );
  }

  close() {
    this.onClose.emit();
  }

}
