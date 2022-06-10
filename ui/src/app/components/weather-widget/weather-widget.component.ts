import { Component, Input, OnInit } from '@angular/core';
import {
  City,
  Coordinate,
  WeatherUnit,
} from 'src/app/shared/common/shared-common.module';
import { BaseService } from 'src/app/shared/services/base-service/-base.service';
import { WeatherService } from 'src/app/shared/services/shared-services.module';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() city: City;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getCurrentWeatherUsingUnits(
        this.city?.Coordinates?.Latitude,
        this.city?.Coordinates?.Longitude,
        WeatherUnit.Metric
      )
      .toPromise()
      .then((weather) => {
        this.city.Weather = weather;
      });
  }

  transformCoordinatesToDMS(coordinates: Coordinate): string {
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
