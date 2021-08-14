import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {
  constructor(
    private httpClient:HttpClient
  ) { }

  getProducts():Observable<any>{
    const {endpoint, routes} = environment.server
    return this.httpClient.post(`${endpoint}/${routes.products}`,{})
  }

  getBrands():Observable<any>{
    const {endpoint, routes} = environment.server
    return this.httpClient.post(`${endpoint}/${routes.brands}`,{})
  }
}
