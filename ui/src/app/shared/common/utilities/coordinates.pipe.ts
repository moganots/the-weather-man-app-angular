import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from '../domain-models/coordinate';

@Pipe({
  name: 'CoordinatesPipe',
})
export class CoordinatesPipe implements PipeTransform {
  transform(coordinates: Coordinate): string {
    const toDMS = (coordinate) => {
      var min, minA, a, deg;
      min = ~~(minA = ((a = Math.abs(coordinate)) - (deg = ~~a)) * 60);
      return deg + '° ' + min + "' " + Math.ceil((minA - min) * 60) + '"';
    };
    return `${toDMS(coordinates?.Latitude)} ${
      coordinates?.Latitude >= 0 ? 'N' : 'S'
    } / ${toDMS(coordinates?.Longitude)} ${
      coordinates?.Longitude >= 0 ? 'E' : 'W'
    }`;
  }
}
