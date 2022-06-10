import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherService } from './weather-service/weather.service';

export { WeatherService } from './weather-service/weather.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [WeatherService]
})
export class SharedServicesModule { }
