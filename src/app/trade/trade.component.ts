import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { ContractService } from '../contract.service';
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

  btcPrice = 0;

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;

  constructor(private apiService: ApiService,
              private contractService: ContractService) { }

  ngOnInit() {
    setInterval(async () => {
      this.loadBTCPrice();
    }, 2000);
    this.loadBTCPrice();
  }

  async loadBTCPrice() {
    this.btcPrice = +((await this.apiService.getTokenPrice()) / 1e30).toFixed(0);
  }

  max() {
  }

  long() {
  }
}
