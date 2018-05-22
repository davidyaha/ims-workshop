import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NetworkService } from './network/network.service';
import { UtilsService } from './utils/utils.service';
import { StateService } from './state/state.service';

@NgModule({
  imports: [AngularCommonModule, HttpClientModule],
  declarations: [],
  providers: [NetworkService, UtilsService, StateService],
})
export class CommonModule {}
