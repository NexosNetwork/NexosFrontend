import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { environment } from 'environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {


  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) { }

  searchIntegrationPlatforms(params: HttpParams): Observable<any> {
    return this.http.get<any>(BASIC_URL + `api/shopify/integration-platforms/search`, {
      headers: this.userStorageService.createAuthorizationHeader(),
      params
    });
  }

  getShopifyInstallUrl(shop: string): Observable<any> {
    const params = new HttpParams()
      .set('shop', shop);
    return this.http.get<any>(BASIC_URL+ `api/shopify/getInstallUrl/${UserStorageService.getUserId()}`, { params });
  }
}
