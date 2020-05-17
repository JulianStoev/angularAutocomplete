import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteIncludeComponent } from './autocomplete-include.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompleteIncludeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AutocompleteIncludeComponent]
})
export class AutocompleteIncludeModule { }
