import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  City,
} from './shared/common/shared-common.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Weather Man (App)';
  cities: Observable<City[]>;
  constructor() {}
  ngOnInit(): void {
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
          FeelsLike: 198
        }
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
          FeelsLike: 198
        }
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
          FeelsLike: 123
        }
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
          FeelsLike: 236
        }
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
          FeelsLike: 198
        }
      },
    ]);
  }
}
