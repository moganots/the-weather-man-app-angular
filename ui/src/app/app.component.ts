import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City, Helpers } from './shared/common/shared-common.module';

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
  cities: Observable<City[]>;
  constructor() {}
  ngOnInit(): void {
    this.getCities();
    this.cities.toPromise().then((cities) => {
      cities.sort(function (x, y) {
        // true values first
        return x.Bookmarked === y.Bookmarked ? 0 : x.Bookmarked ? -1 : 1;
        // false values first
        // return (x.Bookmarked === y.Bookmarked)? 0 : x.Bookmarked? 1 : -1;
      });
    });
  }
  getCities() {
    this.cities = of([
      {
        Name: `Veenendaal, NL`,
        Coordinates: {
          Latitude: 52.026301,
          Longitude: 5.554431,
        },
        Weather: {
          Current: `cloudy with a chance of rain`,
          Actual: 204,
          FeelsLike: 198,
        },
        Bookmarked: this.isBookmarked(`Veenendaal, NL`),
      },
      {
        Name: `Chisinau, MD`,
        Coordinates: {
          Latitude: 47.010453,
          Longitude: 28.86381,
        },
        Weather: {
          Current: `cloudy with a chance of rain`,
          Actual: 204,
          FeelsLike: 198,
        },
        Bookmarked: this.isBookmarked(`Chisinau, MD`),
      },
      {
        Name: `Kaunas, LT`,
        Coordinates: {
          Latitude: 54.898521,
          Longitude: 23.903597,
        },
        Weather: {
          Current: `rainy with thunderstorms`,
          Actual: 123,
          FeelsLike: 123,
        },
        Bookmarked: this.isBookmarked(`Kaunas, LT`),
      },
      {
        Name: `Johannesburg, SA`,
        Coordinates: {
          Latitude: 26.2041,
          Longitude: 28.0473,
        },
        Weather: {
          Current: `clear skies`,
          Actual: 234.6,
          FeelsLike: 236,
        },
        Bookmarked: this.isBookmarked(`Johannesburg, SA`),
      },
      {
        Name: `Cape Town, SA`,
        Coordinates: {
          Latitude: 33.9249,
          Longitude: 18.4241,
        },
        Weather: {
          Current: `cloudy with a chance of rain`,
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
}
