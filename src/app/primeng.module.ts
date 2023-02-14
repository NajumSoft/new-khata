import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SpeedDialModule} from 'primeng/speeddial';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {TabMenuModule} from 'primeng/tabmenu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    ToolbarModule,
    DialogModule,
    MegaMenuModule,
    MenubarModule,
    TabMenuModule,
  ],
  exports:[ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    ToolbarModule,
    DialogModule,
    DynamicDialogModule,
    MegaMenuModule,
    MenubarModule,
    TabMenuModule,
  ]
})
export class PrimengModule { }
