import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/Stock';

@Component({
  selector: 'app-product-stock-update',
  templateUrl: './product-stock-update.component.html',
  styleUrls: ['./product-stock-update.component.scss']
})
export class ProductStockUpdateComponent implements OnInit {
  @Input() stock!:Stock
  size!:String;
  color!:String;
  piece!:number;
  price!:number;
  status!:Boolean;
  type!:String;
  constructor() {
   
  }

  ngOnInit(): void {
   
  }
  closeArea(stockUpdateArea:HTMLDivElement){
    document.getElementById("productStockUpdateArea")?.setAttribute("style","display:none;")
    stockUpdateArea.setAttribute("style","display:none");
  }
}
