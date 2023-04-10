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
  formData!:FormData
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
  updateStock(){
    this.stockService.addImagesThisStock(this.id, this.formData).then(res=> {
      alert("fotoğraf yükleme başarılı")
    }).catch(err=> {
      alert("foroğraflar yüklenirken hatalarla karşılaşıldı." + err)
    })
    const updateStock = {
      piece:this.pieceInput,
      price:this.priceInput,
      color:this.colorInput,
      size:this.sizeInput,
      image:this.stockImage,
      type:this.productBaseStock?"base":"other"
    }
    this.stockService.updateStock(this.id, updateStock).subscribe(res=> {
      this.pieceInput = res.data.piece;
      this.colorInput = res.data.color;
      this.sizeInput = res.data.size;
      this.priceInput = res.data.price;
      this.productBaseStock = res.data.type== "base"? true:false;
      this.stockImage = res.data.image;
      this.stockImages = res.data.images
      alert("güncellendi")
    },(error:HttpErrorResponse)=> {
      alert(error.error.message)
    })
  }
  inputsChange(e:any){
    this.formData = new FormData()
    const files:FileList = e.target.files
    for(let i=0; i< files.length; i++){
      this.formData.append('images', files[i], files[i].name, )      
    }
    
    
  }
  chooseMainStockImage(image:String){
    this.stockImage = image
  }

  ngOnInit(): void {
  }

}
