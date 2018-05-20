import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { NetworkService } from './network/network.service';

@NgModule({
  imports: [AngularCommonModule],
  declarations: [],
  providers: [NetworkService],
})
export class CommonModule {}
