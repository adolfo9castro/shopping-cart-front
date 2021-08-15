import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titleSection = "Filtrar por marca"
  errorMessage: string = "Lo sentimos, parece que tenemos problemas. Intenta de nuevo más tarde"
  brands: any
  brandSelect: any = []
  selectedItemsList = [];
  productsPath: string = ''

  private serviceSubscription: Subscription | undefined

  constructor(
    private globalServicesService: GlobalServicesService

  ) { }

  ngOnInit(): void {
    this.productsPath = ''
    this.globalServicesService.getBrands().subscribe(brands => {
      this.brands = brands
    }, error =>{
      console.log(error);      
      this.brands = false
    })

    this.serviceSubscription = this.globalServicesService.currentPathService.subscribe(thisPath => {
      this.productsPath = thisPath;      
    })
  }

  changeSelection(event:any, brand:string) {
    if (event.checked){
      this.brandSelect.push(brand)
      
    }else{
      this.brandSelect = this.brandSelect.filter((newBrandSelect:any) =>{
        return newBrandSelect !== brand
      })
    }
    this.sendFilter() 
  }

  sendFilter(){
    let sendFilter = {}

    sendFilter = this.brandSelect.length === 0 ? {} : {
      brand : this.brandSelect
    }

    this.globalServicesService.setCurrentFilter(sendFilter)    
  }

}
