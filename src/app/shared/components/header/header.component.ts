import { Component, OnInit } from '@angular/core';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titleSection = "Filtrar por marca"
  brands: any
  brandSelect: any = []
  selectedItemsList = [];
  constructor(
    private globalServicesService: GlobalServicesService

  ) { }

  ngOnInit(): void {
    this.globalServicesService.getBrands().subscribe(brands => {
      this.brands = brands
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
  }

  sendFilter(){
    let sendFilter = {}

    sendFilter = this.brandSelect.length === 0 ? {} : {
      brand : this.brandSelect
    }

    this.globalServicesService.setCurrentFilter(sendFilter)    
  }

}
