import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCarComponent } from './shopping-car.component';

describe('ShoppingCarComponent', () => {
  let component: ShoppingCarComponent;
  let fixture: ComponentFixture<ShoppingCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("El titulo debe ser", () =>{
    expect(component.title).toMatch("Shopping Cart")
  })

});

describe('Comprobando', () =>{
  const title = "Shoping Cart"
  it("Probando Titulo", () => {
    expect(title).toMatch('Cart')
  })
})
