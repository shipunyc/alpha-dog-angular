import { Injectable } from '@angular/core';
import * as transactionsDescriptions from './transactions.descriptions';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionsService {

  transactions = [];
  pendingTransactions = [];
  isTransactionsProcessing = false;
  onRefresh: Function = null;

  notionSource = new BehaviorSubject('');
  currentRefreshSource = this.notionSource.asObservable();

  processingTransactions: Object = { };

  constructor() {
  }

  notionRefreshUsdcBalance (isRefresh) {
    this.notionSource.next(isRefresh);
  }

  setProcessingTransactions() {
    const transactionsTypes = Object.values(transactionsDescriptions).map(item => item.type);

    for (let i = 0; i < transactionsTypes.length; i++) {
      this.processingTransactions[transactionsTypes[i]] = false;
    }
  }

  updateProcessingTransaction(transactionType: string, isTransactionProcessing: boolean) {
    this.processingTransactions[transactionType] = isTransactionProcessing;
    this.updateIsTransactionsProcessing();
  }

  private updateIsTransactionsProcessing() {
    this.isTransactionsProcessing = Object.values(this.processingTransactions).some(item => item)
      || !!this.pendingTransactions.length;
  }

  addTransaction(transaction) {
    const transactions = JSON.parse(
      window.localStorage.getItem('transactions')
    );

    if (transactions && transactions.length === 6) {
      transactions.shift();
    }

    window.localStorage.setItem(
      'transactions',
      JSON.stringify([...transactions, transaction])
    );

    this.transactions = this.getTransactions();
  }

  updateTransaction(transaction) {
    const transactions = JSON.parse(
      window.localStorage.getItem('transactions')
    );

    const existingTransactionIndex = transactions.findIndex(
      (tr) => tr.transactionHash === transaction.transactionHash
    );

    if (existingTransactionIndex === -1) {
      return;
    }

    transactions.splice(existingTransactionIndex, 1, transaction);

    window.localStorage.setItem(
      'transactions',
      JSON.stringify([...transactions])
    );

    this.transactions = this.getTransactions();
  }

  getTransactions() {
    const transactions = window.localStorage.getItem('transactions');

    if (!transactions) {
      window.localStorage.setItem('transactions', JSON.stringify([]));
      return [];
    }

    return JSON.parse(transactions).reverse();
  }

  initTransactions() {
    this.transactions = this.getTransactions();
    this.setProcessingTransactions();
  }
}
