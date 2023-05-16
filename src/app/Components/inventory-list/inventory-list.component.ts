import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/Services/inventory.service';
import { environment } from 'src/enviroments/environments';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent  implements OnInit{
constructor(private _router:Router,private _inventoryService:InventoryService){}
baseUrl:any;
inventoryList:any;
ngOnInit(): void {
  this._inventoryService.GetInventoryList();
    this.baseUrl = environment.BaseUrl;
    this._inventoryService.inventoryList.subscribe(d=>{this.inventoryList= d;console.log(this.inventoryList)});
}
inventoryItemDetailView(inv:any){
  //console.log(inv);

   this._router.navigate(['inventoryItemDetialView/'+inv.itemId]);
 }






}