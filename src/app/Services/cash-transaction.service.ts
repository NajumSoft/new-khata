import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';
import { apiEndPoints } from '../Models/ApiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {


  constructor(private _http:HttpClient) { }

  cashTransactionList = new BehaviorSubject<any>([]);
  transactionType = new BehaviorSubject<string>('');
  inProgress = new BehaviorSubject<boolean>(false);



  saveTransaction(journal:any){
    console.log(journal);
    this._http.post(environment.BaseUrl+apiEndPoints.createJournal,journal).subscribe(d=>{

      this.cashTransactionList.next(d);
      this.inProgress.next(false);
    })
  }

}
