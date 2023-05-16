import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
inventoryList = new BehaviorSubject<any>('');
itemCardData = new BehaviorSubject<any>('');
  constructor(
    private _http:HttpClient
  ) {
   
    
  
  }
  GetInventoryList(){
    
    this._http.get(environment.BaseUrl+'api/onhandstock/orguseronhandstock/'+environment.OrgUserId).subscribe(d=>{this.inventoryList.next(d);console.log('items inentory item')});
  }
  getItemCard(id:number){
    console.log('getItemCard Call');
    this._http.get(environment.BaseUrl+'api/inventoryReports/itemcard/'+id+'/'+environment.OrgUserId).subscribe(d=>{this.itemCardData.next(d)});
  }
}
