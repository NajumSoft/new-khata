import { Component,OnInit } from '@angular/core';
import { CashTransactionService } from 'src/app/Services/cash-transaction.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CashTransactionComponent } from '../cash-transaction/cash-transaction.component';
@Component({
  selector: 'app-cash-trans-selector',
  templateUrl: './cash-trans-selector.component.html',
  styleUrls: ['./cash-trans-selector.component.scss']
})
export class CashTransSelectorComponent implements OnInit {
constructor(private _cashTransactionService:CashTransactionService,public ref: DynamicDialogRef, public dialogService: DialogService){}

ngOnInit(): void {
  this._cashTransactionService.transactionType.subscribe(d=>console.log(d))
    
}

cashIn(){
  this._cashTransactionService.transactionType.next('AppKoMillay');
  this.ref.close();
  this.dialogService.open(CashTransactionComponent,{})

}
cashOut(){
  this._cashTransactionService.transactionType.next('AppNayDiyay');
  this.ref.close();
  this.dialogService.open(CashTransactionComponent,{})
}

}
