import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title: string = "Tienda"
  errorMessage: string = "Lo sentimos, parece que tenemos problemas. Intenta de nuevo más tarde"
  products: any
  sessionStorage: Array<any> = []
  private serviceSubscription: Subscription | undefined

  constructor(
    private globalServicesService: GlobalServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.globalServicesService.whatPath(this.router.url)

    this.globalServicesService.getProducts({}).subscribe(products => {
      this.products = products
    })

    this.serviceSubscription = this.globalServicesService.brandFilterService.subscribe(productsFiltered => {
      this.globalServicesService.getProducts(productsFiltered).subscribe(products => {
        this.products = products
      }, (error) => {
        console.log(error);
      })
    })
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  seeDetails(id: number): void {
    this.router.navigate(["/product/detail/", id])
  }

  setSession(product: any) {

    /* this.sessionStorage.push(product)

    let productsObject = {
      store: this.sessionStorage,
      cant: this.sessionStorage.length,
      buyDiscount: product['brand']
    }
    console.log(productsObject); */
    
    this.globalServicesService.cantProducst(product)

    //sessionStorage.setItem('sessionData',JSON.stringify(this.sessionStorage))
  }
}
