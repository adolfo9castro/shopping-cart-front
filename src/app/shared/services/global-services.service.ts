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

  private currentPath: BehaviorSubject<any> = new BehaviorSubject('')
  public currentPathService: Observable<any> = this.currentPath.asObservable();

  private cantProducts: BehaviorSubject<any> = new BehaviorSubject('')
  public cantProductsService: Observable<any> = this.cantProducts.asObservable();

  private products: BehaviorSubject<any> = new BehaviorSubject('')
  public buyProductsService: Observable<any> = this.products.asObservable();

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

  whatPath(path: any): void {
    this.currentPath.next(path);
  }

  cantProducst(products:any): void {
    this.cantProducts.next(products);
  }

  buyProducts(products:any): void {
    this.products.next(products);
  }

  getDiscount(data: any): Observable<any> {
    const { endpoint, routes } = environment.server
    return this.httpClient.post(`${endpoint}/${routes.discounts}`, data)
  }


}
