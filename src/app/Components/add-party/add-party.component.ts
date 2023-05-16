import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PartyService } from 'src/app/Services/party.service';
import { environment } from 'src/enviroments/environments';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.scss']
})
export class AddPartyComponent implements OnInit {

  constructor(private _partyService:PartyService, public ref: DynamicDialogRef, private messageService: MessageService,private _fb:FormBuilder) { }
  partyPhoto: string = '../../../assets/Images/noImageAvailable.jpg';
  btnIcon: string = 'pi pi-check';
  createPartyForm:any;
  isBtnDisable = false;
  CurrentDate = Date.now();
  selectedValues: string[] = [];
  file: any;

ngOnInit(): void {
  this.createPartyForm = this._fb.group({
    name: [''],
    companyTitle: [null],
    mobileNo: [''],
    cnic: [''],
    email: [''],
    thumbnailURL: [],
    isCustomer: [false],
    isEmployee: [],
    isInvestor: [],
    isBusiness: [],
    isSupplier:[],
    apaR_Visibility: [],
    createdById: ['saif'],
    orgId: [1],
    orgUserId: [environment.OrgUserId],
    isActive: [true],
    // createDate:[new Date()],
  });
  
}

  onPhotoLoad(e: any) {
    this.file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url
    reader.onload = (e: any) => { // called once readAsDataURL is completed
      this.partyPhoto = e.target.result;}}



  saveParty() {
    this._partyService.inProgress.next(true);
    this._partyService.saveParty(this.createPartyForm.value,this.file);
    this.btnIcon = 'pi pi-spin pi-spinner';
    

    this._partyService.inProgress.subscribe(d => {
      if(this._partyService.inProgress.value == false)
       { this.ref.close();}
    })
  
  }

  closeDialog() {
    this.ref.close();
  }
}
