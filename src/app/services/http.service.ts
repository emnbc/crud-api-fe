import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const BASE_URL = '/api';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    return this.http.get<T>(`${BASE_URL}${url}`, {
      ...(params && { params }),
    });
  }

  getResponse<T>(
    url: string,
    params?: { [key: string]: any }
  ): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${BASE_URL}${url}`, {
      observe: 'response',
      ...(params && { params }),
    });
  }

  getBlob(url: string): Observable<Blob> {
    return this.http.get(`${BASE_URL}${url}`, { responseType: 'blob' });
  }

  post<T>(
    url: string,
    body: { [key: string]: any },
    params?: HttpParams
  ): Observable<T> {
    return this.http.post<T>(`${BASE_URL}${url}`, body, { params });
  }

  put<T>(url: string, body: { [key: string]: any }): Observable<T> {
    return this.http.put<T>(`${BASE_URL}${url}`, body);
  }
}

export const downloadBlob = (
  response: Blob,
  fileName: string,
  type: string
) => {
  const blob = new Blob([response], { type });
  const url = window.URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
