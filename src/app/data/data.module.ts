import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'app/data/services/data.service';

@NgModule({
  declarations: [
    DataService
  ],
  imports: [
    CommonModule
  ],
  exports: [DataService]
})
export class DataModule {}
