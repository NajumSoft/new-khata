import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';
import Swal from 'sweetalert2'
import { apiEndPoints } from '../Models/ApiEndPoints';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private _http:HttpClient) { } 
  partyList = new BehaviorSubject<any>([]);
  inProgress = new BehaviorSubject<boolean>(false);




  getPartyList(){
    this._http.get(environment.BaseUrl+'/api/party/cashioparties/'+environment.OrgUserId).subscribe(d=>{this.partyList.next(d)});
  }
  saveParty(data: any, file: any){
    let form = new FormData();
    form.append('file', file);
    form.append('party', JSON.stringify(data));
    this._http.post(environment.BaseUrl+apiEndPoints.createNewParty,form).subscribe(
      (d) => {
        console.log(d);
        this.inProgress.next(false);
        this.getPartyList();
      //  this.spinner.hide();
        //this._partyService.getAll();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Party Created!',
        });
      },
      (error) => {
        this.inProgress.next(false);
        console.log(error.status);
        console.log(error.error.text);
        if (error.status == 200) {
          // this.spinner.hide();
          console.log(error.error.title);
          Swal.fire({
            icon: 'success',
            title: 'Done !',
            text: error.error.text,
          });
        }
        else {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Opps..',
            text: error.error.title ,
          });
        }

      }
    );
  }
}
