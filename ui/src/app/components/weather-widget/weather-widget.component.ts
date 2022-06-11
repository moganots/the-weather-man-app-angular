import { Component, Input, OnInit } from '@angular/core';
import {
  City,
  Coordinate,
  Helpers,
  WeatherUnit,
} from 'src/app/shared/common/shared-common.module';
import { BaseService } from 'src/app/shared/services/base-service/-base.service';
import { WeatherService } from 'src/app/shared/services/shared-services.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
  providers: [WeatherService],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() city: City;
  bookmarkedCities = Helpers.jsonToArray(
    JSON.parse(localStorage.getItem(environment.localStorageBookmarks))
  );

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.isBookmarked();
    this.weatherService
      .getCurrentWeatherUsingUnits(
        this.city?.Coordinates?.Latitude,
        this.city?.Coordinates?.Longitude,
        WeatherUnit.Metric
      )
      .subscribe((weather) => {
        this.city.Weather = weather;
      });
  }

  isBookmarked() {
    this.city.Bookmarked = this.bookmarkedCities.includes(this.city?.Name);
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

  splitCapitaliseFirstLetter(value) {
    return String(value)
      ?.split(' ')
      .map((val) => Helpers.capitalizeFirstLetter(val))
      .join(' ');
  }

  toFahrenheit(digit) {
    return `${Math.floor(digit * 1.8 + 32.0)}° F`;
  }

  toCelsius(digit) {
    return `${Math.floor((digit - 32) / 1.8)}° C`;
  }

  onClickBookmark(city: City) {
    if (city?.Bookmarked) {
      Helpers.removeIf(this.bookmarkedCities, city?.Name);
    } else {
      Helpers.addIf(this.bookmarkedCities, city?.Name);
    }
    city.Bookmarked = !city.Bookmarked;
    localStorage.setItem(
      environment.localStorageBookmarks,
      JSON.stringify(this.bookmarkedCities)
    );
  }
}
