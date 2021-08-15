import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = "Tienda"
  products: any

  private serviceSubscription: Subscription | undefined

  constructor(
    private globalServicesService: GlobalServicesService
  ) { }

  ngOnInit(): void {
    this.globalServicesService.getProducts({}).subscribe(products => {
      this.products = products
    })

    this.serviceSubscription = this.globalServicesService.brandFilterService.subscribe(productsFiltered => {
      this.globalServicesService.getProducts(productsFiltered).subscribe(products => {
        this.products = products
      })
    })
  }
}
