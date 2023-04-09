import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Stock } from 'src/app/models/Stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @Input() product!:Product
  id!: String;
  pieceInput!:number;
  priceInput!:number;
  sizeInput!:String;
  colorInput!:String;
  productBaseStock!:Boolean;
  stockImage!:String;
  stockImages!:Array<String>
  selectedFiles!:Array<File>;
  constructor(private stockService :StockService) { }
  showStocksUpdateArea(stock:Stock, stockUpdateArea:HTMLDivElement){
   stockUpdateArea.setAttribute("style","display:flex");
   this.pieceInput = stock.piece;
   this.colorInput = stock.color;
   this.sizeInput = stock.size;
   this.priceInput = stock.price;
   this.productBaseStock = stock.type== "base"? true:false;
   this.stockImage = stock.image;
   this.stockImages =stock.images
   this.id = stock._id
  }
  // updateStock(){
  //   console.log( this.formData)
    
  // }
  inputsChange(e:any){
    const formData = new FormData()
    const files:FileList = e.target.files
    for(let i=0; i< files.length; i++){
      formData.append('images', files[i], files[i].name, )
      // this.stockService.addImagesThisStock(this.id, formData).subscribe(res=> {
      //   alert("fotoğraf yükleme başarılı")
      // },(error:HttpErrorResponse)=> {
      //   alert("yükleme sırasında hatalarla karşılaşıldı. "+ error.message)
      // })
    }
    console.log(formData.get("images"))

  }

  ngOnInit(): void {
  }

}
