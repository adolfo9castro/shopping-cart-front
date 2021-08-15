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

}
