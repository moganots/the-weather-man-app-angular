import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherUnit } from '../../common/enums/weather-unit.enum';
import { Weather } from '../../common/shared-common.module';
import { Helpers } from '../../common/utilities/helpers';
import { BaseService } from '../base-service/-base.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends BaseService {
  constructor(
    public httpClient: HttpClient,
    public protocol: string,
    public host: string,
    public port: string,
    public relativePath: string,
    public queryPath: string,
    public apiKey: string
  ) {
    super(httpClient);
    this.protocol = protocol;
    this.host = host;
    this.port = port;
    this.relativePath = relativePath;
    this.apiKey = apiKey;
  }
  getCurrentWeather<T>(lat: number, lon: number): Observable<T> {
    return this.httpClient
      .get(this.getBaseApi(), this.getQueryParams(lat, lon))
      .pipe(
        map((responseResult: any) => {
          return mapValues(responseResult);
        }),
        catchError((error) => this._handleError(error))
      );
  }
  getCurrentWeatherUsingUnits(
    lat: number,
    lon: number,
    unit: WeatherUnit = WeatherUnit.Standard
  ) {
    return this.httpClient
      .get(this.getBaseApi(), this.getQueryParams(lat, lon, unit))
      .pipe(
        map((responseResult: any) => {
          return mapValues(responseResult);
        }),
        catchError((error) => this._handleError(error))
      );
  }
  getQueryParams(
    lat: number,
    lon: number,
    unit: WeatherUnit = WeatherUnit.Standard
  ) {
    const fromStringOptions = [
      Helpers.nullIf(`apiKey=${this.apiKey}`),
      Helpers.nullIf(`lat=${lat}`),
      Helpers.nullIf(`lon=${lon}`),
      Helpers.nullIf(`unit=${unit}`),
    ]
      .filter(
        (fromStringOption) =>
          !(fromStringOption === null || fromStringOption === undefined)
      )
      .join(`&`);
    return { params: new HttpParams({ fromString: fromStringOptions }) };
  }
}
function mapValues(weather: any): Weather {
  if(weather){
    const current = Helpers.getFirst(weather?.weather);
    return {
      Current: current?.description?.split(' '),
      Actual: weather?.main?.temp,
      FeelsLike: weather?.main?.feels_like
    } as Weather;
  }
  return null;
}

