import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService, PrimeIcons } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemService } from 'src/app/Services/item.service';
import { environment } from 'src/enviroments/environments';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  providers: [MessageService],
})

export class AddItemComponent implements OnInit {

  constructor(private _itemService: ItemService, public ref: DynamicDialogRef, private messageService: MessageService, private _http: HttpClient, private _fb: FormBuilder) { }
  itemPhoto: string = '../../../assets/Images/noImageAvailable.jpg';
  btnIcon: string = 'pi pi-check';
  isBtnDisable = false;
  createItemForm: any;
  txtItemCode = new FormControl();
  txtDescriptions = new FormControl();
  CurrentDate = Date.now();
  selectedValues: string[] = [];
  uomList: any;
  selectedUomId: any[] = [];
  categoryList: any;
  selectedCategoryId: any;
  serialControlled: any;
  isActive: any;
  file: any;





  ngOnInit(): void {
    this.getUOM();
    this._http.get(environment.BaseUrl + '/api/Category/InventoryCatVMs').subscribe((d: any) => { this.categoryList = d; });
    this.createItemForm = this._fb.group({
      createDate: [new Date()],
      // itemType:[1,],
      // id:[],
      categoryId: [''],
      itemCode: [''],
      uomId: [''],
      description: [''],
      orgUserId: [environment.OrgUserId],
      serialControlled: [false],
      isActive: [true],
    });
  }



  onPhotoLoad(e: any) {
    this.file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // read file as data url
    reader.onload = (e: any) => { // called once readAsDataURL is completed
      this.itemPhoto = e.target.result;
    }
  } showmeResutls() {
    console.log(this.selectedCategoryId.id)
  }
  uomChange() {
    console.log(this.selectedUomId);
  }

  getUOM() {
    this._http
      .get(
        environment.BaseUrl +
        'api/lookup/unitofmeasures/' + environment.OrgUserId
      )
      .subscribe((d) => {
        this.uomList = d;

      });
  }



  async saveItem() {
    this._itemService.inProgress.next(true);
    this.isBtnDisable = this._itemService.inProgress.value;

    this.createItemForm.value.itemCode = this.txtItemCode.value;
    this.createItemForm.value.uomId = this.selectedUomId;
    this.createItemForm.value.categoryId = this.selectedCategoryId.id;
    this.createItemForm.value.declarations = this.txtDescriptions.value;
    this._itemService.saveItem(this.createItemForm.value, this.file);
    // this.createItemForm.value.isActive = this.isActive[0];
    // this.createItemForm.value.serialControlled = this.serialControlled[0];
    console.log(this.createItemForm.value)
    this.messageService.add({ severity: 'success', summary: 'Party Added Successfully', detail: 'Zafir Alam' });
    // setInterval({})
    this.btnIcon = 'pi pi-spin pi-spinner';


    this._itemService.inProgress.subscribe(d => {
      if(this._itemService.inProgress.value == false)
       { this.ref.close();}
    })

    // setTimeout(() => {
    //   console.log(this.txtItemCode.value)
    //   this.ref.close();
    // }, 2000)

  }

  closeDialog() {
    this.ref.close();
  }

  submitCreateItemForm() {

  }


}