import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { ERC20_ABI } from '../abi/erc20_abi';
import { POOL_ABI } from '../abi/pool_abi';


@Injectable({ providedIn: 'root' })
export class ContractService {

  public address = '';

  private web3: any = null;
  private web3w: any = null;

  constructor() {
  }

  async init() {
    const isUnlocked = await this.isUnlocked();
    if (isUnlocked) {
      await this.enable();
    }

    this.chainChanged();
  }

  isConnected() {
    return window['ethereum'] && window['ethereum'].isConnected();
  }

  async isUnlocked() {
    return window['ethereum'] && await window['ethereum']['_metamask'].isUnlocked();
  }

  async enable() {
    let res;

    try {
      res = await window['ethereum'].enable();
    } catch(e) {
      return "";
    }

    const id = (+window['ethereum'].chainId).toFixed(0);

    let provider;
    if (environment.web3EndPoint && (id == "1" || id == "5" || id == "137" || id == "42161")) {
      const endpoint = {
        "1": "https://mainnet.infura.io/v3/" + environment.web3EndPoint,
        "5": "https://goerli.infura.io/v3/" + environment.web3EndPoint,
        "137": "https://polygon-mainnet.infura.io/v3/" + environment.web3EndPoint,
        "42161": "https://arbitrum-mainnet.infura.io/v3/" + environment.web3EndPoint
      }[id];

      provider = new window['Web3'].providers.HttpProvider(endpoint);
    } else {
      provider = window['ethereum'];
    }

    this.web3 = new window['Web3'](provider);
    this.web3w = new window['Web3'](window['ethereum']);

    this.address = res ? res[0] : "";
    return this.address;
  }


  waitFor(duration) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, duration);
    });
  }

  _send(sendHandler) {
    return new Promise((resolve, reject) => {
      sendHandler.on('receipt', () => {
        resolve();
      }).on('error', () => {
        reject();
      })
    });
  }

  _decToHex(x, decimal) {
    if (x == 0) return '0x0';
    
    let str = x;
    for (var index = 0; index < decimal; index++) {
      str += "0";
    }

    let pos = str.indexOf(".");
    if (pos != -1) {
      str = str.substr(0, pos) + str.substr(pos + 1, decimal);
    }

    var dec = str.toString().split(''), sum = [], hex = [], i, s
    while (dec.length) {
      s = 1 * parseInt(dec.shift())
      for (i = 0; s || i < sum.length; i++) {
        s += (sum[i] || 0) * 10
        sum[i] = s % 16
        s = (s - sum[i]) / 16
      }
    }

    while (sum.length) {
      hex.push(sum.pop().toString(16));
    }

    return '0x' + hex.join('');
  }

  async getNetworkName() {
    const id = +window['ethereum'].chainId;
    return await this.getNetworkNameFrom(id);
  }

  getNetworkNameFrom(id) {
    switch(id) {
      case 1:
        return 'Ethereum';
      case 5:
        return 'Goerli';
      case 56:
        return 'BSC';
      case 137:
        return 'Polygon';
      case 42161:
        return 'Arbitrum';
      default:
        return 'unknown';
    }
  }

  async chainChanged() {
    window['ethereum'].on('chainChanged', (chainId) => {
      const id = parseInt(chainId, 16);
      const networkName = this.getNetworkNameFrom(id);
      window.location.reload();
    });
  }

  async switchToArbitrum() {
    await window['ethereum'].request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xa4b1', // A 0x-prefixed hexadecimal string
          chainName: 'Arbitrum',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH', // 2-6 characters long
            decimals: 18,
          },
          rpcUrls: ['https://arb1.arbitrum.io/rpc'],
          blockExplorerUrls: ['https://arbiscan.io']
        }
      ]
    });
  }

  async balanceOf(tokenContractAddress, who) {
    const token = new this.web3.eth.Contract(ERC20_ABI, tokenContractAddress);
    return await token.methods.balanceOf(who).call();
  }

  async getPolicyArrayLength(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getPolicyArrayLength().call();
  }

  async getPolicy(poolContractAddress, policyIndex) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.policyArray(policyIndex).call();
  }

  async getCollateralAmount(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getCollateralAmount().call();
  }

  async getAvailableCapacity(poolContractAddress, policyIndex, week) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getAvailableCapacity(policyIndex, week).call();
  }

  async getCurrentAvailableCapacity(poolContractAddress, policyIndex) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getCurrentAvailableCapacity(policyIndex).call();
  }

  async getTotalAvailableCapacity(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getTotalAvailableCapacity().call();
  }

  async getUserBaseAmount(poolContractAddress, who) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getUserBaseAmount(who).call();
  }

  async getUserTidalAmount(poolContractAddress, who) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getUserTidalAmount(who).call();
  }

  async getPoolDepositWaitAmount(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getPoolDepositWaitAmount().call();
  }

  async getUserDepositWaitAmount(poolContractAddress, who) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getUserDepositWaitAmount(who).call();
  }

  async getPoolTerms(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.terms().call();
  }

  async getPolicyWeeks(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.policyWeeks().call();
  }

  async getWithdrawWaitWeeks1(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.withdrawWaitWeeks1().call();
  }

  async getWithdrawWaitWeeks2(poolContractAddress) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.withdrawWaitWeeks2().call();
  }

  async getUserAvailableWithdrawAmount(poolContractAddress, who) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getUserAvailableWithdrawAmount(who).call();
  }

  async getWithdrawRequestCount(poolContractAddress, who) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.withdrawRequestCount(who).call();
  }

  async getWithdrawRequest(poolContractAddress, who, index) {
    const pool = new this.web3.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.withdrawRequestMap(who, index).call();
  }

  async getAllowance(tokenAddress_, spender_) {
    const token = new this.web3.eth.Contract(ERC20_ABI, tokenAddress_);
    return await token.methods.allowance(this.address, spender_).call();
  }

  async approve(tokenAddress, spender) {
    const token = new this.web3w.eth.Contract(ERC20_ABI, tokenAddress);
    const res = token.methods.approve(spender, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({from: this.address});
    return await this._send(res);
  }

  async deposit(poolContractAddress, amount, decimals=18) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.deposit(this._decToHex(amount, decimals)).send({from: this.address});
    return await this._send(res);
  }

  async withdraw(poolContractAddress, amount, decimals=18) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.withdraw(this._decToHex(amount, decimals)).send({from: this.address});
    return await this._send(res);
  }

  async withdrawTidal(poolContractAddress) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.withdrawTidal().send({from: this.address});
    return await this._send(res);
  }

  async buy(poolContractAddress, policyIndex, amount, fromWeek, toWeek, decimals=18) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.buy(
        policyIndex, this._decToHex(amount, decimals), fromWeek, toWeek).send({from: this.address});
    return await this._send(res);
  }

  async getPool(poolContractAddress) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getPool().call();
  }

  async setPool(
      poolContractAddress,
      withdrawWaitDays1_,
      withdrawWaitDays2_,
      policyWeeks_,
      withdrawFee_,
      claimFee_,
      managementFee_,
      enabled_,
      name_,
      terms_) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.setPool(
        withdrawWaitDays1_,
        withdrawWaitDays2_,
        policyWeeks_,
        withdrawFee_,
        claimFee_,
        managementFee_,
        enabled_,
        name_,
        terms_).send({from: this.address});
    return await this._send(res);
  }

  async setPolicy(
      poolContractAddress,
      index_,
      collateralRatio_,
      weeklyPremium_,
      name_,
      terms_) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.setPolicy(
        index_,
        collateralRatio_,
        weeklyPremium_,
        name_,
        terms_).send({from: this.address});
    return await this._send(res);
  }

  async addPolicy(
      poolContractAddress,
      collateralRatio_,
      weeklyPremium_,
      name_,
      terms_) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    const res = pool.methods.addPolicy(
        collateralRatio_,
        weeklyPremium_,
        name_,
        terms_).send({from: this.address});
    return await this._send(res);
  }

  async getClaimRequestArray(poolContractAddress, limit, offset) {
    const pool = new this.web3w.eth.Contract(POOL_ABI, poolContractAddress);
    return await pool.methods.getClaimRequestArray(limit, offset).call();
  }
}
