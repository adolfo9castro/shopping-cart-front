import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss']
})
export class ShoppingCarComponent implements OnInit {
  private serviceSubscription: Subscription | undefined

  constructor(private globalServicesService: GlobalServicesService) { }

  ngOnInit(): void {
    this.serviceSubscription = this.globalServicesService.buyProductsService.subscribe(products => {
      console.log(products);      
    })
  }

}
