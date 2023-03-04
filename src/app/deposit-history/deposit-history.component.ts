import { Component, Input, Output, EventEmitter } from "@angular/core";
import { formatRate, formatBalance, formatDate, formatFixed } from '../utils';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.css']
})
export class DepositHistoryComponent {
  @Input() depositData: any[];

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;
  environment = environment;
  
  constructor() {

  }

  ngOnInit() {
    console.log(this.depositData)
  }

  close() {
    this.onClose.emit();
  }
}