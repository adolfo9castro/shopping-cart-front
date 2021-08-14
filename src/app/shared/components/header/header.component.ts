import { Component, OnInit } from '@angular/core';
import { GlobalServicesService } from 'src/app/shared/services/global-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  brands:any
  constructor(
    private globalServicesService:GlobalServicesService
  ) { }

  ngOnInit(): void {
    this.globalServicesService.getProducts().subscribe(brands =>{
      this.brands = brands
    })
  }

}
