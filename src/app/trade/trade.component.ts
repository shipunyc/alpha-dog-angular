import { Component, OnInit } from '@angular/core';

import { formatRate, formatBalance, formatDate, formatFixed } from '../utils';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  baseAmountToTrade = "";
  availableAmount = "";

  longing = false;

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;

  constructor() { }

  ngOnInit() {
  }

  max() {
  }

  long() {
  }
}
