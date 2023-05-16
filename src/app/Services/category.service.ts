import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';
import { apiEndPoints } from '../Models/ApiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { } 
  categoryList = new BehaviorSubject<any>([]);
  


  getExpenseCategories(){
    this._http.get(environment.BaseUrl+apiEndPoints.expenseCategory).subscribe(d=>{this.categoryList.next(d)});
  }
  getInventoryCategories(){

  }

}
