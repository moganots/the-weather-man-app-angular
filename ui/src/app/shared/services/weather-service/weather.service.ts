import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeatherUnit } from '../../common/enums/weather-unit.enum';
import { Weather } from '../../common/shared-common.module';
import { Helpers } from '../../common/utilities/helpers';
import { BaseService } from '../base-service/-base.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends BaseService {
  config = environment.api.openweather;
  constructor(
    public httpClient: HttpClient
  ) {
    super(httpClient);
    this.protocol = this.config?.protocol;
    this.host = this.config?.host;
    this.port = this.config?.port;
    this.relativePath = this.config?.relativePath;
    this.queryPath = this.config?.queryPath;
    this.apiKey = this.config?.apiKey;
  }
  getCurrentWeather<T>(lat: number, lon: number): Observable<T> {
    return this.httpClient
      .get(this.getBaseApi(), this.getQueryParams(lat, lon))
      .pipe(
        map((responseResult: any) => {
          return this.mapValues(responseResult);
        }),
        catchError((error) => this._handleError(error))
      );
  }
  getCurrentWeatherUsingUnits(
    lat: number,
    lon: number,
    units: WeatherUnit = WeatherUnit.Standard
  ) {
    return this.httpClient
      .get(this.getBaseApi(), this.getQueryParams(lat, lon, units))
      .pipe(
        map((responseResult: any) => {
          return this.mapValues(responseResult);
        }),
        catchError((error) => this._handleError(error))
      );
  }
  getQueryParams(
    lat: number,
    lon: number,
    units: WeatherUnit = WeatherUnit.Standard
  ) {
    const fromStringOptions = [
      Helpers.nullIf(`appid=${this.apiKey}`),
      Helpers.nullIf(`lat=${lat}`),
      Helpers.nullIf(`lon=${lon}`),
      Helpers.nullIf(`units=${units}`),
    ]
      .filter(
        (fromStringOption) =>
          !(fromStringOption === null || fromStringOption === undefined)
      )
      .join(`&`);
      console.log(fromStringOptions);
    return { params: new HttpParams({ fromString: fromStringOptions }) };
  }
  mapValues(weather: any): Weather {
    const current = Helpers.getFirst(weather?.weather);
    return {
      Current: current?.description,
      Actual: weather?.main?.temp,
      FeelsLike: weather?.main?.feels_like
    } as unknown as Weather;
  }
}

