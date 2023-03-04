import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClubComponent } from './club/club.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateAClubComponent } from './create-a-club/create-a-club.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { DepositHistoryComponent } from './deposit-history/deposit-history.component';
import { WithdrawHistoryComponent } from './withdraw-history/withdraw-history.component';
import { TransactionsWindowComponent } from './transactions-window/transactions-window.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,
    ClubComponent,
    LeaderboardComponent,
    MyAccountComponent,
    CreateAClubComponent,
    AlertMessageComponent,
    DepositHistoryComponent,
    WithdrawHistoryComponent,
    TransactionsWindowComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
