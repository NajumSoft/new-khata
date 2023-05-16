import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/app/Services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.scss']
})
export class PartyListComponent implements OnInit {
  constructor(private _partyService: PartyService) { }
  partyList: any[] = []

  ngOnInit(): void {
     this._partyService.getPartyList();
    this._partyService.partyList.subscribe(d => {
      this.partyList = d;
   

    });
  }
}
