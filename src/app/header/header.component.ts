import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ContractService } from '../contract.service';

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path = '';

  isShow: boolean = false;

  abbrAddress: string = "";
  isCorrectNetwork: boolean;
  environment = environment;
  loading: boolean;
  transactionsShown: boolean = false;

  constructor(private contractService: ContractService,
              private route: ActivatedRoute,
              public router: Router) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url.includes('/home')) {
            this.path = 'home';
          } else if (this.router.url.includes('/leaderboard')) {
            this.path = 'leaderboard';
          }  else if (this.router.url.includes('/create-a-club')) {
            this.path = 'create-a-club';
          } else {
            this.path = '';
          }
        }
      }
    );
  }

  ngOnInit() {
    this.load();
  }

  async load() {
    await this.contractService.init();

    if (this.contractService.address) {
      this.abbrAddress = this.getAbbr(this.contractService.address);
    }

    this.isCorrectNetwork = (await this.contractService.getNetworkName()) == environment.networkName;

    window['ethereum'].on('accountsChanged', this.listenAccountChange)
  }

  toggleMenu(isShow) {
    this.isShow = isShow
  }

  toggleTransactionsShown() {
    this.transactionsShown = !this.transactionsShown;
  }

  goPage (router) {
    this.isShow = false;
    this.router.navigate([router])
  }

  getAbbr(line) {
    const len = line.length;
    if (len < 10) return len;
    return line.substr(0, 6) + '...' + line.substr(len - 4, len);
  }

  async switch() {
    this.loading = true;
    try {
      if (environment.networkName == 'Goerli') {
        await this.contractService.switchToGoerli();
      } else {
        await this.contractService.switchToMatic();
      }
    } catch(e) {
    }
    await this.load();
    this.loading = false;
  }

  listenAccountChange (account) {
    window.location.reload();
  }
}
