import { Component, OnInit } from '@angular/core';

import { ContractService } from '../contract.service';
import { formatBalance } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  formatBalance = formatBalance;

  constructor(private contractService: ContractService) { }

  ngOnInit() {
  }

  async load() {
    await this.contractService.init();
  }
}
