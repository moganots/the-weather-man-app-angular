import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as ObservableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public httpHeaders: HttpHeaders;
  public providerName: string;
  public protocol: string;
  public host: string;
  public port: string;
  public relativePath: string;
  public queryPath: string;
  public apiKey: string;

  constructor(public httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.set('Access-Control-Allow-Origin', 'origin-list');
  }
  getBaseApi() {
    return `${this.protocol}://${this.host}${this.port ? `:${this.port}` : ``}${
      this.relativePath ? `/${this.relativePath}` : ``
    }`;
  }
  protected _handleError(error: HttpErrorResponse | any): Observable<any> {
    const errorMsg = [
      error.message || 'Error: Unable to complete request.',
      JSON.stringify(error),
    ]
      .filter((message) => !(message === null))
      .join(`\r\n`);
    return ObservableThrowError(errorMsg);
  }
}
