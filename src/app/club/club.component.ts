import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ContractService } from '../contract.service';
import { formatRate, formatBalance, formatDate, formatFixed } from '../utils';
import { ApiService } from '../api.service';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  baseAmountToDeposit = "";
  baseAmountToWithdraw = "";

  userWalletBaseAmount = "";

  allowance = 0;

  userAvailableWithdrawAmount = 0;

  approving = false;
  depositing = false;
  withdrawing = false;

  formatRate = formatRate;
  formatBalance = formatBalance;
  formatDate = formatDate;

  constructor(private activeRoute: ActivatedRoute,
              private apiService: ApiService,
              public transactionService: TransactionsService,
              private contractService: ContractService) { }

  ngOnInit() {
  }

  deposit() {
  }

  withdraw() {
  }

  maxDeposit() {
  }

  maxWithdraw() {
  }

  toggledepositPopupShow() {
  }

  toggleWithdrawPopupShow() {
  }
}
