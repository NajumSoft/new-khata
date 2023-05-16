import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddPartyComponent } from './Components/add-party/add-party.component';
import { InventoryListComponent } from './Components/inventory-list/inventory-list.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { PartyListComponent } from './Components/party-list/party-list.component';
import { TradeInvoiceComponent } from './Components/trade-invoice/trade-invoice.component';

const routes: Routes = [
  {path:'home',component:AppComponent},
  {path:'inventoryList',component:InventoryListComponent},
  {path:'tradeInvoice',component:TradeInvoiceComponent},
  {path:'itemList',component:ItemsListComponent},
  {path:'partyList',component:PartyListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
