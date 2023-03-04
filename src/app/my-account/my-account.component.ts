import { Component, OnInit } from '@angular/core';

import { POOL_CONFIG } from '../../config/pool_config';
import { ContractService } from '../contract.service';
import { ApiService } from '../api.service';
import { formatDate, formatBalance } from '../utils';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  pool = {
    index: 0,
    name: '',
    tags: [],
    contractAddress: '',
    currencyName: ''
  };

  policyArray = [];

  loading = false;
  data = {
    buys: [],
    deposits: []
  };

  formatBalance = formatBalance;
  formatDate = formatDate;

  constructor(private contractService: ContractService,
              private apiService: ApiService) {}

  ngOnInit() {
    this.pool = POOL_CONFIG[0];

    this.loadPolicies();
    this.loadData();
  }

  async loadPolicies() {
    await this.contractService.init();

    this.loading = true;
    const policyArrayCount = await this.contractService.getPolicyArrayLength(
        this.pool.contractAddress);
    for (let i = 0; i < policyArrayCount; ++i) {
      this.policyArray[i] = {loading: true};
    }

    const all = [];

    for (let i = 0; i < policyArrayCount; ++i) {
      all.push((async(i) => {
        this.policyArray[i] = await this.contractService.getPolicy(
            this.pool.contractAddress, i);
      })(i));
    }

    await Promise.all(all);

    this.loading = false;
  }

  loadData() {
    const command = `
{
  buys(first: 5) {
    id
    who_
    policyIndex_
    amount_
    fromWeek_
    toWeek_
    blockTimestamp
  }
  deposits(first: 5) {
    id
    who_
    amount_
    blockTimestamp
  }
}
`;
    this.apiService.queryGraph(command)
  	    .subscribe((res: any) => {
      this.data = res.data;
    }, err => {
      alert(err);
    });
  }

  getDateFromWeek(value) {
    const day = 3600 * 24 * 1000;
    const week = day * 7;
    return formatDate(value * week - 4 * day, '/');
  }

  getPolicyName(policyIndex_) {
    return this.policyArray[policyIndex_].name;
  }
}
