import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {
  private currentFilter: BehaviorSubject<any> = new BehaviorSubject('')
  public brandFilterService: Observable<any> = this.currentFilter.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(data: any): Observable<any> {
    const { endpoint, routes } = environment.server
    return this.httpClient.post(`${endpoint}/${routes.products}`, data)
  }

  getBrands(): Observable<any> {
    const { endpoint, routes } = environment.server
    return this.httpClient.post(`${endpoint}/${routes.brands}`, {})
  }

  setCurrentFilter(brandFilter: any): void {
    this.currentFilter.next(brandFilter);
  }
}
