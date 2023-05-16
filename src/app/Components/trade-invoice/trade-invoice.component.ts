import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/Services/item.service';
import { PartyService } from 'src/app/Services/party.service';
import { TradeInvoiceService } from 'src/app/Services/trade-invoice.service';

@Component({
  selector: 'app-trade-invoice',
  templateUrl: './trade-invoice.component.html',
  styleUrls: ['./trade-invoice.component.scss']
})
export class TradeInvoiceComponent {

  value1:any;
  value2:any;
  selectedDate:any;
  selectedItem:any;
  itemsList: any[] = [];
  filterItemList:any;
  autoFieldVisable:boolean = false; 
  mobineNumber:any;
  authData: any;
  totalBilletAmount: any;
  currentItemFieldIdIs = 0;
  partyControl = new FormControl();
  itemControl = new FormControl();
  itemFilteredOptions: any;
  partyFilteredOptions: any;
  
  partyList: any[] = [];
  InvoiceType = 'Sales';
  BtnText = 'Create';
  Invoice_Form: FormGroup = new FormGroup({});
  InvoiceDetails = new FormArray([]);
  constructor(
    private _datePipe:DatePipe,
    private _partyService: PartyService,
    private _tradeInvoiceService:TradeInvoiceService,
    private fb: FormBuilder,
    private _http: HttpClient,
    private router: Router,
    private _itemService:ItemService,
    private ActivatedRoute: ActivatedRoute,
    // private toastr: ToastrService,
    private _Dialog:MatDialog,
    
  ) {}

  ngOnInit(): void {

    this._itemService.getItemList();
    this._itemService.itemsList.subscribe(d=>{this.itemsList =d;    console.log(this.itemsList);});
//     this._invoiceService.SelectedBomItems.subscribe(d=>{
//       console.log('its from d');
//       console.log(d);
// if(d[0].itemId != null ){
//   this.autoFieldVisable = true;
// }
//       d.forEach(e=>{
//          this.autoSetItems(e.itemId,e.itemName,e.itemQty);
//        //console.log(`item Id is : ${e.itemId},Item Quantity is : ${e.itemQty}`);
//       });
//      //console.log(d.itemId);
//       //  this.autoSetItems(d.itemId,d.itemQty)
//       });




    // this._itemService.itemList.subscribe(d=>{this.itemsList = d;console.log(this.itemsList)});
    // this._invoiceService.InvoiceType.subscribe((d) => (this.InvoiceType = d));
    this.authData = JSON.parse(localStorage.getItem('authData') as string);
   if(this._tradeInvoiceService.InvoiceType.value == 'Purchase'){
      this._partyService.partyList.subscribe((d) => {
      this.partyList = d;
      this.partyFilteredOptions = this.partyList;
    });

   }
   else{

    // this._partyService.saleParties.subscribe((d) => {
    //   this.partyList = d;
    //   this.partyFilteredOptions = this.partyList;
    // });

   }
this.partyControl.valueChanges.subscribe((d) => this.filterPartyData(d));

 
    this.itemFilteredOptions = this.itemsList;

  if(this._tradeInvoiceService.InvoiceType.value == 'Sale')
  {
    this.partyControl.setValue({
      id:6,
      name:'Walkin Customer',

    });
    this.Invoice_Form.get('partyName')?.setValue('Walkin Customer');
    this.Invoice_Form.get('partyId')?.setValue(6);


    // this.Invoice_Form = this.fb.group({
    //   invoiceType: ['', Validators.required],
    //   // invoiceType: ['Sale', Validators.required],
    //   invoiceDate: [new Date(), Validators.required],
    //   orgUserId: [this.authData['orgUserId']],
    //   partyName: ['Walkin Customer', Validators.required],
    //   partyId: [6, Validators.required],
    //   lisenceNumber: ['', ],
    //   totalBilledAmount: [0, Validators.required],
    //   totalSettledAmount: [0, Validators.required],
    //   totalBalanceAmount: [0, Validators.required],
    //   InvoiceNotes: ['', ],
    //   InvoiceDetails: this.fb.array([this.makeSerial()]),
    // });
  }
  else{

    this.partyControl.setValue({
      id:7,
      name:'Walkin Supplier',

    });

    this.Invoice_Form.get('partyName')?.setValue('Walkin Supplier');
    this.Invoice_Form.get('partyId')?.setValue(7);


    this.Invoice_Form = this.fb.group({
      invoiceType: ['', Validators.required],
      // invoiceType: ['Sale', Validators.required],
      invoiceDate: [new Date(), Validators.required],
      orgUserId: [2],
      partyName: ['Walkin Supplier', Validators.required],
      partyId: [7, Validators.required],
      lisenceNumber: ['', ],
      totalBilledAmount: [0, Validators.required],
      totalSettledAmount: [0, Validators.required],
      totalBalanceAmount: [10, Validators.required],
      InvoiceNotes: ['', ],
      InvoiceDetails: this.fb.array([this.addItems()]),
    });
  }
    
    this.itemSubscribeForCalculation(0);
  }

  get detailArray() {
    return this.Invoice_Form.get('InvoiceDetails') as FormArray;
  }
  calculateBalance(index:number,quantity:any,unitPrice:any){
    let qty = Number(quantity);
    let price = Number(unitPrice);
    let total = qty*price;


    //this.Invoice_Form.value.InvoiceDetails[index].totalAmount = total;
    this.detailArray.controls[index].get('totalAmount')?.setValue(total);
//console.log(this.Invoice_Form.value.InvoiceDetails[index].totalAmount);
this.Invoice_Form.value.InvoiceDetails.forEach((d:any)=>{console.log(d.totalAmount)});
  }
  async autoSetItems(itemId:any,itemName:string,itemQuantity:any) {
    console.log(`itemControlValue Is :${this.currentItemFieldIdIs}`);
    this.detailArray.controls[this.currentItemFieldIdIs]
      .get('itemId')
      ?.setValue(itemId);
      this.detailArray.controls[this.currentItemFieldIdIs]
      .get('itemName')
      ?.setValue(itemName);
    this.detailArray.controls[this.currentItemFieldIdIs]
      .get('quantity')
      ?.setValue(itemQuantity);
      console.log("this.Invoice_Form.value");
      console.log(this.Invoice_Form.value);
      console.log('autoSetItems Done !');
      this.detailArray.push(this.addItems());
      this.currentItemFieldIdIs = this.currentItemFieldIdIs + 1;
     
  }

  addItems(): FormGroup {
    console.log(this.Invoice_Form.value);
    return this.fb.group({
      itemId: [],
      itemName: [],
      uomId:[1],
      serial: [],
      remarks: ['Optional'],
      quantity: [1, Validators.required],
      unitRate: [0, Validators.required],
      totalAmount: [0, Validators.required],
      isCancelled: [false],
    });
  }
  // makeSerial(): FormGroup {
  //   console.log(this.Invoice_Form.value);
  //   return this.fb.group({
  //     itemId: [],
  //     itemName: [],
  //     uomId:[1],
  //     serial: [],
  //     remarks: ['Optional'],
  //     quantity: [0, Validators.required],
  //     unitRate: [0, Validators.required],
  //     totalAmount: [0, Validators.required],
  //     isCancelled: [false],
  //   });
  // }

  calculateFigure(){
    console.log('CalculateFigures');
    this.Invoice_Form.get('totalBilledAmount')?.setValue(0);
    console.log(this.detailArray.length);
    for(var i =0; i <=this.detailArray.length;i++){
     let qty = this.Invoice_Form.value.InvoiceDetails[i].quantity;
     let price = this.Invoice_Form.value.InvoiceDetails[i].unitRate;
     let total = qty*price;
     this.detailArray.controls[i].get('totalAmount')?.setValue(total);
     console.log(this.Invoice_Form.value);
     this.Invoice_Form.get('totalBilledAmount')?.setValue(this.Invoice_Form.get('totalBilledAmount')?.value+total);

  }
  }
  loadBom(){
    // let dialofref =  this._Dialog.open(BomListComponent);
    
  

 

  }
  addRow(inpIndex: any) {
    console.log(inpIndex);
    // this.getItemList();
    this.itemFilteredOptions = this.itemsList;
    let index = inpIndex + 1;
    this.detailArray.push(this.addItems());
    // this.toastr.success('New Row Added');
    this.itemSubscribeForCalculation(index);
    this.currentItemFieldIdIs = this.currentItemFieldIdIs + 1;
  }
  deleteItem(i: any) {
    console.log(this.detailArray);
    this.detailArray.removeAt(i);
    // this.toastr.warning('One Row Deleted');
  }
  // displayPartyName(subject: any) {
  //   return subject ? subject.name : undefined;
  // }
  // displayitemName(subject: any) {
  //   return subject ? subject.itemCode : undefined;
  // }

  filterPartyData(value: string) {
    this.partyFilteredOptions = this.partyList.filter((item) => {
      return item.name.toLowerCase().indexOf(value.toLocaleLowerCase()) > -1;
    });
  }
  filterItemData(value: string) {
    this.itemFilteredOptions = this.itemsList.filter((item) => {
      return item.itemCode.toLowerCase().indexOf(value.toLocaleLowerCase()) > -1;
    });
  }
  submit() {
    let i = this._datePipe.transform(this.Invoice_Form.value.invoiceDate,'yyyy-MM-dd') ;
    console.log(i);
    this.Invoice_Form.get('invoiceType')?.setValue(this.InvoiceType);
    this.Invoice_Form.get('partyName')?.setValue(this.partyControl.value.name);
    this.Invoice_Form.get('partyId')?.setValue(this.partyControl.value.id);
    this.Invoice_Form.get('invoiceDate')?.setValue(i);
    console.log(this.Invoice_Form.value);
    // this..saveInvoice(this.Invoice_Form.value);
  }

  itemSubscribeForCalculation(index:any) {

    this.itemControl.valueChanges.subscribe(d=>{this.filterItemData(d)});
    this.detailArray.controls[index]
      .get('unitRate')
      ?.valueChanges.subscribe((d) => {
        let amountTotal =
          this.Invoice_Form.value.InvoiceDetails[index].quantity * d;
           this.detailArray.controls[index]
          .get('totalAmount')
          ?.setValue(amountTotal);
          this.Invoice_Form.get('totalBilledAmount')?.setValue(0);
          for (var i = 0; i <= this.detailArray.length; i++) {this.Invoice_Form.get('totalBilledAmount')?.setValue(this.detailArray.controls[i].get('totalAmount')?.value+this.Invoice_Form.get('totalBilledAmount')?.value); } 
        
      });
    this.detailArray.controls[index]
      .get('quantity')
      ?.valueChanges.subscribe((d) => {
        let amountTotal =
          this.Invoice_Form.value.InvoiceDetails[index].unitRate * d;
        this.detailArray.controls[index]
          .get('totalAmount')
          ?.setValue(amountTotal);
        this.Invoice_Form.get('totalBilledAmount')?.setValue(
          this.Invoice_Form.value.totalBilledAmount + amountTotal
        );
      });

   
  }
  receivedAmount() {
    console.log(this.Invoice_Form.value);
    let billAmount = this.Invoice_Form.value.totalBilledAmount;
    let settledAmount = this.Invoice_Form.value.totalSettledAmount;
    let balanceAmount = billAmount - settledAmount;
    this.Invoice_Form.get('totalBalanceAmount')?.setValue(balanceAmount);
    console.log(this.Invoice_Form.value);
  }
  setItemId() {
    console.log('itemControlValue Is :');
    console.log(this.currentItemFieldIdIs);

    console.log(this.itemControl.value.id);

    this.detailArray.controls[this.currentItemFieldIdIs]
      .get('itemId')
      ?.setValue(this.itemControl.value.id);

  }
  grabItemData() {
    console.log('itemControlValue Is :');
    console.log(this.currentItemFieldIdIs);
    console.log(this.itemControl.value.id);
    this.detailArray.controls[this.currentItemFieldIdIs]
      .get('itemId')
      ?.setValue(this.itemControl.value.id);

  }
  onItemChange(){
    alert('item changed');
    console.log(this.selectedItem.itemCode);
    console.log(this.Invoice_Form.value);
    }
  filterItem(e:any){
    let query = e.query;
    let array = [];
    array = this.itemsList.filter(i => (i.itemCode.toLowerCase()).startsWith(query.toLowerCase()));
    this.filterItemList = array;
    console.log(this.filterItemList);
  }
  onDateChange(){
    alert('Date Change or Set')
  }
  
  // calculateBalance(quantity:any,unitPrice:any){
    
  //   //console.log(this.Invoice_Form.value.InvoiceDetails.length);
  //   let qty = Number(quantity);
  //   let price = Number(unitPrice);
  //   let balace = qty*price;
    
  //   return balace;
  // }
}
