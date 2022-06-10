import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { SharedCommonModule } from './common/shared-common.module';
export { SharedServicesModule } from './services/shared-services.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
