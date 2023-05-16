import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { DockModule } from 'primeng/dock';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeSelectModule } from 'primeng/treeselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';

import {InputNumberModule} from 'primeng/inputnumber';



const materialModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule ,
  AutoCompleteModule,
  RippleModule,
  ButtonModule,
  SplitButtonModule,
  SpeedDialModule,
  ToolbarModule,
  DialogModule,
  MegaMenuModule,
  MenubarModule,
  TabMenuModule,
  DockModule,
  ToastModule,
  TooltipModule,
  TreeSelectModule,
  ContextMenuModule,
  InputTextModule,
  InputTextareaModule,
  CheckboxModule,
  DropdownModule,
  TableModule,
  CalendarModule,
  InputMaskModule,
  InputNumberModule,
];

@NgModule({
  declarations: [],
  imports: [
    materialModules



  ],
  exports: [
    materialModules
  ]
})
export class PrimengModule { }
