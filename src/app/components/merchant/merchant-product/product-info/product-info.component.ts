import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
  @Input() product!: Product
  // id!: String;
  // pieceInput!: number;
  // priceInput!: number;
  // sizeInput!: String;
  // colorInput!: String;
  // productBaseStock!: Boolean;
  // stockImage!: String;
  // stockImages!: Array<String>
  // formData!: FormData

  constructor(private stockService: StockService) { }

  // showStocksUpdateArea(stock: Stock, stockUpdateArea: HTMLDivElement) {
  //   stockUpdateArea.setAttribute("style", "display:flex");
  //   this.setVeriables(stock);
  // }

  // updateStock() {
  //   const updateStock = this.createStockObject();
  //   if (!this.formData) {
  //     this.stockService.updateStock(this.id, updateStock).subscribe(res => {
  //       this.setVeriables(res.data)
  //       window.location.replace("/merchant/product");
  //     }, (error: HttpErrorResponse) => {
  //       alert(error.error.message)
  //     })
  //   } else {
  //     this.stockService.addImagesThisStock(this.id, this.formData).then(res => {
  //       this.stockService.updateStock(this.id, updateStock).subscribe(res => {
  //         this.setVeriables(res.data)
  //         window.location.replace("/merchant/product");
  //       }, (error: HttpErrorResponse) => {
  //         alert(error.error.message)
  //       })
  //     }).catch(err => {
  //       alert("foroğraflar yüklenirken hatalarla karşılaşıldı." + err)
  //     })
  //   }
  // }

  // inputsChange(e: any) {
  //   this.formData = new FormData()
  //   const files: FileList = e.target.files
  //   for (let i = 0; i < files.length; i++) {
  //     this.formData.append('images', files[i], files[i].name,)
  //   }
  // }

  // chooseMainStockImage(image: String) {
  //   this.stockImage = image
  // }

  // setVeriables(data: Stock) {
  //   this.pieceInput = data.piece;
  //   this.colorInput = data.color;
  //   this.sizeInput = data.size;
  //   this.priceInput = data.price;
  //   this.productBaseStock = data.type == "base" ? true : false;
  //   this.stockImage = data.image;
  //   this.stockImages = data.images,
  //   this.id = data._id

  // }
  // createStockObject() {
  //   const newStock = {

  //     piece: this.pieceInput,
  //     price: this.priceInput,
  //     color: this.colorInput,
  //     size: this.sizeInput,
  //     image: this.stockImage,
  //     type: this.productBaseStock ? "base" : "other"
  //   }
  //   return newStock
  // }

  ngOnInit(): void {
  }

}
