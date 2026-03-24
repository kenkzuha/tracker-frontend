import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';

export interface PriceData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  currency: string;
  marketCap: number;
}

export interface ChartData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface ChartResponse {
  symbol: string;
  range: string;
  interval: string;
  data: ChartData[];
}

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  private baseUrl = 'http://localhost:3000/prices';
  constructor(private http: HttpClient){}

  getPriceFromCache(symbol: string): Observable<PriceData>{
    return this.http.get<PriceData>(`${this.baseUrl}/quote/${symbol}`);
  }

  getPrice(symbol: string[]): Observable<PriceData[]> {
    return this.http.get<PriceData[]>(`${this.baseUrl}/quotes?symbol=${symbol.join(',')}`)
  }

  searchSymbol(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?q=${query}`);
  }

  getChart(symbol: string, range: string = '1M'): Observable<ChartResponse> {
    return this.http.get<ChartResponse>(`${this.baseUrl}/chart/${symbol}?range=${range}`);
  }
}
