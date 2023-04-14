import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Property } from 'src/app/models/Property';
import { Stock } from 'src/app/models/Stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  
  @Input() product!:Product;
  name!:String;
  visible!:Boolean;
  description!:String;
  stocks!:Array<Stock>;
  categories!:Array<Category>;
  image!:String;
  images!:Array<String>;
  selectedStock!: Stock;
  id!: String;
  pieceInput!: number;
  priceInput!: number;
  sizeInput!: String;
  colorInput!: String;
  productBaseStock!: Boolean;
  stockImage!: String;
  stockImages!: Array<String>
  formData!: FormData
  urls: Array<String> = [];
  props: Array<Property> = [];  
  constructor(private stockService: StockService) { 
  }

  ngOnInit(): void {
    this.setAttributes();
    if(Array.isArray(this.product.categories)){
      this.product.categories.map(category=> {
        if(category != null){
          this.props = category.properties
        }
      })
    }
  }
  setAttributes(){
    this.image=this.product.image;
    this.images=this.product.images;
    this.name = this.product.name;
    this.description = this.product.description;
    this.categories = this.product.categories;
    this.stocks = this.product.stocks;
    this.visible = this.product.visible;
  }
  // showStocksUpdateArea(stock: Stock, stocksUpdateArea:HTMLDivElement){
  //   this.txtSize = stock.size
   
  //   stocksUpdateArea.setAttribute("style","display:block;")
    
  // }
  showStocksUpdateArea(stock: Stock, stockUpdateArea: HTMLDivElement) {
    stockUpdateArea.setAttribute("style", "display:flex");
    this.setVeriables(stock);
  }

  updateStock() {
    const updateStock = this.createStockObject();
    if (!this.formData) {
      this.stockService.updateStock(this.id, updateStock).subscribe(res => {
        this.setVeriables(res.data)
        window.location.replace("/merchant/product");
      }, (error: HttpErrorResponse) => {
        alert(error.error.message)
      })
    } else {
      this.stockService.addImagesThisStock(this.id, this.formData).then(res => {
        this.stockService.updateStock(this.id, updateStock).subscribe(res => {
          this.setVeriables(res.data)
          window.location.replace("/merchant/product");
        }, (error: HttpErrorResponse) => {
          alert(error.error.message)
        })
      }).catch(err => {
        alert("foroğraflar yüklenirken hatalarla karşılaşıldı." + err)
      })
    }
  }

  inputsChange(e: any) {
    this.formData = new FormData()
    const files: FileList = e.target.files
    this.urls = []
    for (let i = 0; i < files.length; i++) {
      this.formData.append('images', files[i], files[i].name,)
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload =(events:any)=>{
        this.urls.push(events.target.result)
      }

    }
    console.log(this.urls)
  }

  chooseMainStockImage(image: String) {
    this.stockImage = image
  }

  setVeriables(data: Stock) {
    this.pieceInput = data.piece;
    this.colorInput = data.color;
    this.sizeInput = data.size;
    this.priceInput = data.price;
    this.productBaseStock = data.type == "base" ? true : false;
    this.stockImage = data.image;
    this.stockImages = data.images,
    this.id = data._id

  }
  createStockObject() {
    const newStock = {

      piece: this.pieceInput,
      price: this.priceInput,
      color: this.colorInput,
      size: this.sizeInput,
      image: this.stockImage,
      type: this.productBaseStock ? "base" : "other"
    }
    return newStock
  }

  changeProperties(i:number, event:any){
    this.product.properties[i] = event.target.value
  }
}
