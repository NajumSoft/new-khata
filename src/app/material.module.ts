import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule ,} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {MatDialogModule} from '@angular/material/dialog';

import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const angularMaterial = [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatExpansionModule,
  MatInputModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatTreeModule,
  MatDialogModule,
  MatTabsModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [],
  imports: [angularMaterial],
  exports:[angularMaterial]
})
export class MaterialModule { }
