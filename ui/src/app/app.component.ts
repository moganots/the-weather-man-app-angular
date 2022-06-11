import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, Helpers, WeatherUnit } from './shared/common/shared-common.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Weather Man (App)';
  bookmarkedCities = Helpers.jsonToArray(
    JSON.parse(localStorage.getItem(environment.localStorageBookmarks))
  );
  weatherUnit = WeatherUnit.Metric;
  cities: Observable<City[]>;

  constructor() {}
  ngOnInit(): void {
    this.getCities();
    this.sortBookmarkedCities();
  }
  getCities() {
    this.cities = of([
      {
        Name: `Veenendaal, NL`,
        Coordinates: {
          Latitude: 52.017,
          Longitude: 5.550,
        },
        Weather: {
          CurrentWeatherDescription: `cloudy with a chance of rain`,
          CurrentWeatherIconUri: `http://openweathermap.org/img/wn/10d@2x.png`,
          Actual: 204,
          FeelsLike: 198,
        },
        Bookmarked: this.isBookmarked(`Veenendaal, NL`),
      },
      {
        Name: `Chisinau, MD`,
        Coordinates: {
          Latitude: 47.006,
          Longitude: 28.858,
        },
        Weather: {
          CurrentWeatherDescription: `cloudy with a chance of rain`,
          CurrentWeatherIconUri: `http://openweathermap.org/img/wn/10d@2x.png`,
          Actual: 204,
          FeelsLike: 198,
        },
        Bookmarked: this.isBookmarked(`Chisinau, MD`),
      },
      {
        Name: `Kaunas, LT`,
        Coordinates: {
          Latitude: 54.900,
          Longitude: 23.900,
        },
        Weather: {
          CurrentWeatherDescription: `rainy with thunderstorms`,
          CurrentWeatherIconUri: `http://openweathermap.org/img/wn/10d@2x.png`,
          Actual: 123,
          FeelsLike: 123,
        },
        Bookmarked: this.isBookmarked(`Kaunas, LT`),
      },
      {
        Name: `Johannesburg, ZA`,
        Coordinates: {
          Latitude: -26.202,
          Longitude: 28.044,
        },
        Weather: {
          CurrentWeatherDescription: `clear skies`,
          CurrentWeatherIconUri: `http://openweathermap.org/img/wn/10d@2x.png`,
          Actual: 234.6,
          FeelsLike: 236,
        },
        Bookmarked: this.isBookmarked(`Johannesburg, SA`),
      },
      {
        Name: `Cape Town, ZA`,
        Coordinates: {
          Latitude: -33.926,
          Longitude: 18.423,
        },
        Weather: {
          CurrentWeatherDescription: `cloudy with a chance of rain`,
          CurrentWeatherIconUri: `http://openweathermap.org/img/wn/10d@2x.png`,
          Actual: 204,
          FeelsLike: 198,
        },
        Bookmarked: this.isBookmarked(`Cape Town, SA`),
      },
    ]);
  }
  isBookmarked = (cityName: string) => {
    return this.bookmarkedCities.includes(cityName);
  };
  sortBookmarkedCities(){
    this.cities.toPromise().then((cities) => {
      cities.sort(function (x, y) {
        // true values first
        return x.Bookmarked === y.Bookmarked ? 0 : x.Bookmarked ? -1 : 1;
        // false values first
        // return (x.Bookmarked === y.Bookmarked)? 0 : x.Bookmarked? 1 : -1;
      });
    });
  }
}
