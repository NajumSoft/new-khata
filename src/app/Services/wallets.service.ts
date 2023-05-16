import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  constructor(private _http:HttpClient) { } 
  walletList = new BehaviorSubject<any>([]);

  getWalletsList(){
   

    this._http.get(environment.BaseUrl+'/api/wallet/wallets/'+environment.OrgUserId).subscribe((d) => {this.walletList.next(d)});
    
    
  }



}
