import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  type: string;
  portfolioId: string;
  createdAt: Date;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: Asset[];
  createdAt: Date;
}

export interface AddAssetDto {
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  type: string;
}

export interface UpdateAssetDto {
  quantity: number;
  buyPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private baseUrl = 'http://localhost:3000/portfolio';

  constructor(private http: HttpClient){}

  getAllPortfolio(): Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.baseUrl);
  }

  createPortfolio(name: string): Observable<Portfolio>{
    return this.http.post<Portfolio>(this.baseUrl, { name });
  }

  deletePortfolio(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addAsset(portfolioId: string, dto: AddAssetDto): Observable<Asset> {
    return this.http.post<Asset>(`${this.baseUrl}/${portfolioId}/assets`, dto);
  }

  updateAsset(assetId: string, dto: UpdateAssetDto): Observable<Asset> {
    return this.http.patch<Asset>(`${this.baseUrl}/assets/${assetId}`, dto);
  }

  deleteAsset(assetId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/assets/${assetId}`);
  }
}
