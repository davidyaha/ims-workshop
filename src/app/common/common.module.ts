import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NetworkService } from './network/network.service';

@NgModule({
  imports: [AngularCommonModule, HttpClientModule],
  declarations: [],
  providers: [NetworkService],
})
export class CommonModule {}
