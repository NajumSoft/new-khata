import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroments/environments';
import Swal from 'sweetalert2'
import { apiEndPoints } from '../Models/ApiEndPoints';

@Injectable({
  providedIn: 'root',


})
export class ItemService {
  constructor(private _http:HttpClient) { } 

  itemsList = new BehaviorSubject<any>([]);
  inProgress = new BehaviorSubject<boolean>(false);





getItemList(){
  this._http.get(environment.BaseUrl+'api/lookup/items/'+environment.OrgUserId).subscribe(d=>{
    console.log(d);
    this.itemsList.next(d);
  });
  
}
  saveItem(data: any, file: any) {
    console.log(JSON.stringify(data));
    var form = new FormData();
    form.append('file', file);
    form.append('item', JSON.stringify(data));
    console.log(form);
    this._http
      .post(environment.BaseUrl +apiEndPoints.createItem , form)
      .subscribe((d) => {
        this.inProgress.next(false);
        this.getItemList();
         // this.itemList.next(d);
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'Item Created',
        //   showConfirmButton: false,
        //   timer: 1500
        // }).then(d => {
        //   this.spinner.hide();
        // });
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

        });
  }
}
