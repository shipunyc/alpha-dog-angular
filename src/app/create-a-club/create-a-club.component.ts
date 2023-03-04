import { Component, OnInit } from '@angular/core';

import { ContractService } from '../contract.service';
import { formatRate, formatBalance, formatDate } from '../utils';

@Component({
  selector: 'app-create-a-club',
  templateUrl: './create-a-club.component.html',
  styleUrls: ['./create-a-club.component.css']
})
export class CreateAClubComponent implements OnInit {

  formatBalance = formatBalance;
  formatDate = formatDate;

  name = "";
  waitDays = "";
  gapDays = "";
  openDays = "";
  managementFee = "";
  terms = "";

  saving = false;

  constructor(private contractService: ContractService) { }

  ngOnInit() {
  }

  save() {
  }

  getAbbr(line) {
    const len = line.length;
    if (len < 10) return len;
    return line.substr(0, 6) + '...' + line.substr(len - 4, len);
  }
}
