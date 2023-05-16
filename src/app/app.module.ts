import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {PrimengModule} from './primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPartyComponent } from './Components/add-party/add-party.component';

import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { TopNavbarComponent } from './Components/top-navbar/top-navbar.component';
import { AddItemComponent } from './Components/add-item/add-item.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { PartyListComponent } from './Components/party-list/party-list.component';
import { CashTransactionComponent } from './Components/cash-transaction/cash-transaction.component';
import { CashTransSelectorComponent } from './Components/cash-trans-selector/cash-trans-selector.component';
import { InventoryListComponent } from './Components/inventory-list/inventory-list.component';
import { TradeInvoiceComponent } from './Components/trade-invoice/trade-invoice.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    AddPartyComponent,
    SideBarComponent,
    TopNavbarComponent,
    AddItemComponent,
    ItemsListComponent,
    PartyListComponent,
    CashTransactionComponent,
    CashTransSelectorComponent,
    InventoryListComponent,
    TradeInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    NgbModule,
    HttpClientModule
 


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
