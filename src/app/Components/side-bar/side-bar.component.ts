import { Component } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isMenuOpen:boolean = true;
  MenuOpenBtn(){
    this.isMenuOpen = !this.isMenuOpen;
   }
}
