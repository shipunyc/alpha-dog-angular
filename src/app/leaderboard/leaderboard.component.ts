import { Component, OnInit } from '@angular/core';

import { ContractService } from '../contract.service';
import { formatRate, formatBalance, formatDate, formatDateSimple, formatFixed } from '../utils';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  loading = false;

  alertTitle: string = "";
  alertBody: string = "";
  willShowAlertMessage: boolean = false;

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;
  formatDateSimple = formatDateSimple;

  constructor(private contractService: ContractService) { }

  ngOnInit() {
  }

  async load() {
    await this.contractService.init();
  }

}
