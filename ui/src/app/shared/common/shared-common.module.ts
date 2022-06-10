import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoordinatesPipe } from './utilities/coordinates.pipe';

export { City } from './domain-models/city';
export { Coordinate } from './domain-models/coordinate';
export { Weather } from './domain-models/weather';
export { WeatherUnit } from './enums/weather-unit.enum';
export { Helpers } from './utilities/helpers';
export { CoordinatesPipe } from './utilities/coordinates.pipe';

@NgModule({
  declarations: [
    CoordinatesPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [CoordinatesPipe]
})
export class SharedCommonModule { }
