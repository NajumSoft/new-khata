import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  constructor(private _itemService: ItemService) { }
  itemList: any[] = [];
  first = 0;
  rows = 10;
  loading: boolean = true;


  ngOnInit(): void {
    this._itemService.getItemList();
    this._itemService.itemsList.subscribe(d => {
      this.itemList = d;

    });
  }

}
