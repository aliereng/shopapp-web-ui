import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Property } from 'src/app/models/Property';
import { Stock } from 'src/app/models/Stock';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  @Input() product!:Product;
  stocks!:Array<Stock>;
  categories!:Array<Category>;
  selectedStock!: Stock;
  formData!: FormData
  urls: Array<String> = [];
  props: Array<Property> = [];  
  editorConfig = {
    width: "100%", 
    height: "100%"
  }
  constructor(private stockService: StockService, private productService: ProductService) { 
  }
  ngOnInit(): void {
    if(Array.isArray(this.product.categories)){
      this.product.categories.map(category=> {
        if(category.properties != null){
          this.props = category.properties
        }
      })
    }
  }

  
  // showStocksUpdateArea(stock: Stock, stocksUpdateArea:HTMLDivElement){
  //   this.txtSize = stock.size
   
  //   stocksUpdateArea.setAttribute("style","display:block;")
    
  // }
  showStocksUpdateArea(stock: Stock, stockUpdateArea: HTMLDivElement) {
    this.selectedStock = stock;

    stockUpdateArea.setAttribute("style", "display:flex");
  }

  updateStock() {
    const updateStock = this.createStockObject();
    if (!this.formData) {
      this.stockService.updateStock(this.selectedStock._id, updateStock).subscribe(res => {
        window.location.replace("/merchant/product");
      }, (error: HttpErrorResponse) => {
        alert(error.error.message)
      })
    } else {
      this.stockService.addImagesThisStock(this.selectedStock._id, this.formData).then(res => {
        this.stockService.updateStock(this.selectedStock._id, updateStock).subscribe(res => {
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
      this.formData.append('images', files[i], files[i].name)
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload =(events:any)=>{
        this.urls.push(events.target.result)
      }

    }
  }

  chooseMainStockImage(image: String) {
    this.selectedStock.image = image
    console.log(image)
    console.log(this.selectedStock.image)
  }

  setVeriables(data: Stock) {
  
    this.selectedStock = data

  }
  createStockObject() {
    const newStock = {

      piece: this.selectedStock.piece,
      price: this.selectedStock.price,
      color: this.selectedStock.color,
      size: this.selectedStock.size,
      image: this.selectedStock.image,
      base: this.selectedStock.base
    }
    return newStock
  }

  changeProperties(i:number, event:any){
    this.product.properties[i] = event.target.value
  }
  updateProduct(){
    this.productService.updateProductById(this.product).subscribe(res=> {
      this.product = res.data
      window.location.replace("/merchant/product");
    },(error:HttpErrorResponse)=> {
      alert("ürün güncelleme esnasında hatalarla karşılaşıldı: "+error.error.message)
    })
  }
}
