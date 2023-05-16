import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CashTransactionService } from 'src/app/Services/cash-transaction.service';
import { CategoryService } from 'src/app/Services/category.service';
import { PartyService } from 'src/app/Services/party.service';
import { WalletsService } from 'src/app/Services/wallets.service';
import { environment } from 'src/enviroments/environments';

@Component({
  selector: 'app-cash-transaction',
  templateUrl: './cash-transaction.component.html',
  styleUrls: ['./cash-transaction.component.scss'],

})
export class CashTransactionComponent implements OnInit {
  constructor(private _cashTransactionService:CashTransactionService, private _categoryService:CategoryService, private _walletService: WalletsService, private _partyService: PartyService, public ref: DynamicDialogRef,  private _fb: FormBuilder) { }
  selectedWallet: any;
  walletList: any[] = [];
  selectedLedger: any;
  ledgerList: any[] = [];
  filterLedgerList: any[] = [];
  selectedCategory: any;
  categoryList: any[] = [];
  selectedDate: Date = new Date(Date.now());
  remarks: any;
  amount: any;
  btnIcon: string = 'pi pi-check';
  createPartyForm: any;
  isBtnDisable = false;
  selectedValues: string[] = [];
  cashTransactionForm:any;
  transactionType:string  ='';

  ngOnInit(): void {
    this._walletService.getWalletsList();
    this._walletService.walletList.subscribe(d => { this.walletList = d; });
    this._partyService.getPartyList();
    this._partyService.partyList.subscribe(d => { this.ledgerList = d; this.filterLedgerList = ['d']; });
    this._categoryService.getExpenseCategories();
    this._categoryService.categoryList.subscribe(d=>{this.categoryList = d});
    this._cashTransactionService.transactionType.subscribe(d=>this.transactionType = d);
    
    

    this.cashTransactionForm =    this._fb.group({
      transType : [''],
      transDate: ['',Validators.required],
      walletId: ['', Validators.required],
      walletName: ['',Validators.required],
      PartyId: [''],
      categoryId: [''],
      orgUserId:[environment.OrgUserId],
      partyName: [''],
      remarks: ['', Validators.required],
      appKoMillay: ['0', Validators.required],
      appNayDiyay: ['0', Validators.required],
      journalType: ['Cash', Validators.required],
    });

  }

  onWalletChange() {
    
  }
  onLedgerChange() {

    
   
  }
  onCategoryChange() {
    
  }
  onDateChange() {
    
  }
  filterLedger(e: any) {
    let query = e.query;
    let array = [];
    array = this.ledgerList.filter(i => (i.name.toLowerCase()).startsWith(query.toLowerCase()));
    this.filterLedgerList = array;
  }

  saveTransaction() {
    this._cashTransactionService.inProgress.next(true);
    this.btnIcon = 'pi pi-spin pi-spinner';
    

    this.cashTransactionForm.value.transType  = this.transactionType;
    this.cashTransactionForm.value.walletId = this.selectedWallet;
    this.cashTransactionForm.value.PartyId = this.selectedLedger.id;
    this.cashTransactionForm.value.partyName = this.selectedLedger.name;
    this.cashTransactionForm.value.categoryId = this.selectedCategory.id;
    this.cashTransactionForm.value.transDate = this.selectedDate;
    this.cashTransactionForm.value.remarks = this.remarks;

if(this.transactionType == 'AppKoMillay'){
    this.cashTransactionForm.value.appKoMillay = Number(this.amount);
}
else{
  this.cashTransactionForm.value.appNayDiyay = Number(this.amount);
}
   


    console.log(this.cashTransactionForm);
    this._cashTransactionService.saveTransaction(this.cashTransactionForm.value);
    this._cashTransactionService.inProgress.subscribe(d=>{this.isBtnDisable = d;{
      if(d == false){
        this.btnIcon = 'pi pi-check'
        this.ref.close();
      }
      else{
        this.btnIcon = 'pi pi-spin pi-spinner';
      }
    }})
    this._cashTransactionService.cashTransactionList.subscribe(d=>{
     
       console.log(d)

    });
    // this._partyService.inProgress.next(true);
    // this._partyService.saveParty(this.createPartyForm.value,this.file);
    // this.btnIcon = 'pi pi-spin pi-spinner';


    // this._partyService.inProgress.subscribe(d => {
    //   if(this._partyService.inProgress.value == false)
    //    { this.ref.close();}
    // })

  }

  closeDialog() {
    
    this.ref.close();
  }
}
