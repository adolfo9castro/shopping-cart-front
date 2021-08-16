import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  titleSection = "Filtrar por marca"
  brands: any
  brandSelect: any = []
  selectedItemsList = [];
  productsPath: string = ''
  hidden = true;
  priceTotal: number = 0;
  cantProducts: number = 0;
  sessionStorage: Array<any> = []
  infoShopping: Array<any> = []
  private serviceSubscription: Subscription | undefined

  constructor(
    private globalServicesService: GlobalServicesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {   
    sessionStorage.clear() 
    this.productsPath = ''
    this.globalServicesService.getBrands().subscribe(brands => {
      this.brands = brands
    }, error => {
      console.log(error);
      this.brands = false
    })

    this.serviceSubscription = this.globalServicesService.currentPathService.subscribe(thisPath => {
      this.productsPath = thisPath;
    })

    this.serviceSubscription = this.globalServicesService.cantProductsService.subscribe(products => {      

      if (products !== '') this.sessionStorage.push(products)

      this.cantProducts = this.sessionStorage.length

      this.hidden = this.cantProducts === 0 ? true : false;

      sessionStorage.setItem('shopping-car', JSON.stringify(this.sessionStorage))

      let totalPrice: number = 0

      let { brand, price } = products
      if (brand !== undefined) {
        let priceInSession: any = sessionStorage.getItem(brand) || 0

        let priceSession = JSON.parse(priceInSession) || 0

        totalPrice = priceSession.totalPrice === undefined ? price : price + priceSession.totalPrice

        sessionStorage.setItem(brand, JSON.stringify({ totalPrice }))

        this.iHaveADiscount({ brand: brand })
      }
    })
  }

  iHaveADiscount(buyDiscount: object): void {
    this.globalServicesService.getDiscount(buyDiscount).subscribe(discounts => {
      const { brand, discount, threshold } = discounts[0]
      let getSessgion: any = sessionStorage.getItem(brand)
      let getPriceBrandSelected: any = JSON.parse(getSessgion)
      let message: string

      if (getPriceBrandSelected.totalPrice < threshold) {
        message = `Agrega ${threshold - getPriceBrandSelected.totalPrice} más en productos ${brand} y aprovecha un
        descuento total de ${discount} en tu compra!`
      } else {
        let totalPrice = getPriceBrandSelected.totalPrice - discount
        sessionStorage.setItem(brand, JSON.stringify({ totalPrice }))
        message = `Se aplicó un descuento de ${discount} por haber comprado
        ${getPriceBrandSelected.totalPrice} de productos ${brand}!`
      }
      this.callSnack(message)
    }, error => {
      console.log(error);
    })
  }

  callSnack(message: any) {
    this.snackBar.open(message, 'Aceptar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  changeSelection(event: any, brand: string) {
    if (event.checked) {
      this.brandSelect.push(brand)

    } else {
      this.brandSelect = this.brandSelect.filter((newBrandSelect: any) => {
        return newBrandSelect !== brand
      })
    }
    this.sendFilter()
  }

  sendFilter() {
    let sendFilter = {}

    sendFilter = this.brandSelect.length === 0 ? {} : {
      brand: this.brandSelect
    }

    this.globalServicesService.setCurrentFilter(sendFilter)
  }

}
