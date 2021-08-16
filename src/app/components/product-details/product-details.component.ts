import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any
  private serviceSubscription: Subscription | undefined
  constructor(
    private globalServicesService: GlobalServicesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.globalServicesService.whatPath('')  
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    this.globalServicesService.getProducts({id:id}).subscribe(products => {
      this.product = products[0]
    })
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
