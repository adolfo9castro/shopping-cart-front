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
  title = "Shopping Cart"
  infoShopping:any
  constructor(private globalServicesService: GlobalServicesService) { }

  ngOnInit(): void {
    this.globalServicesService.whatPath('') 
    let shoppingSession: any = sessionStorage.getItem('shopping-car') || 0

    let shoppingSessionInfo = JSON.parse(shoppingSession)

    this.infoShopping = shoppingSessionInfo
  }

}
