import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Property } from 'src/app/models/Property';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productValue = this.formBuilder.group({
    name: ["", [Validators.required]],
    description: "",

  })

  productCategory: Array<String> = [];
  selectedCategories: string = "";
  categoryProps: Array<Property> = [];
  urls: Array<String> = [];
  formData!: FormData;
  stocks: Array<FormData> = [];
  size!: String;
  color!: String;
  piece!: number;
  price!: number;
  base!: Boolean
  categories: Array<Category> = [];
  differentImage = false;
  stockString: string = "";
  productId!: string;
  properties: Array<String> = []
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private productService: ProductService, private stockService: StockService) {
    this.categoryService.getAllCategory().subscribe(res => {
      res.data.map(category => {
        if (category.parentId == "null") {
          this.categories.push(category)
        }
      })
    }, (error: HttpErrorResponse) => {
      console.log("kategoriler getirilirken hatalarla karşılaşıldı." + error.error.message)
    })

  }


  selectCategory(event: any) {
    this.productCategory.push(event.target.value)
    this.categoryService.getCategoryById(event.target.value).subscribe(res => {
      this.categories = res.data.children
      this.selectedCategories += `${res.data.name}<br>`
      if (res.data.properties.length != 0) {
        this.categoryProps = res.data.properties;
       
        res.data.properties.map(property=> {
          this.properties.push(property.results[0])
        })
      }
    })

  }
  resetProductCategories() {
    this.categoryService.getAllCategory().subscribe(res => {
      res.data.map(category => {
        if (category.parentId == "null") {
          this.categories.push(category)
        }
      })
    }, (error: HttpErrorResponse) => {
      console.log("kategoriler getirilirken hatalarla karşılaşıldı." + error.error.message)
    })
    this.selectedCategories = "";
    this.productCategory = []
  }
  ngOnInit(): void {
  }
  inputChange(e: any) {
    const files: FileList = e.target.files
    this.urls = [];
    if (!this.formData) {
      this.formData = new FormData()
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      this.formData.append("images", files[i], files[i].name)
      reader.onload = (events: any) => {
        this.urls.push(events.target.result)
      }
    }
    // console.log(this.formData.get("images"))
  }
  onSubmitStock() {
    if (!this.formData) {
      this.formData = new FormData()
    }
    if (this.base && !this.formData.get("images")) {
      alert("base stok için görsel eklenmelidir.");
    } else {
      this.formData.append("stock", `{
        "size": "${this.size}",
        "color": "${this.color}",
        "piece": ${this.piece},
        "price": ${this.price},
        "base": ${this.base}
      }`);

    }
    console.log(this.formData.get("images"))
    console.log(this.formData.get("stock"))
  }
  createStock() {
    this.onSubmitStock();
    this.stockService.createStockAndAddThisProduct(this.productId, this.formData).then(res => {
      this.clearStockInputs();
    }).catch(err => {
      alert(err.message)
    })
  }
  changeDifferentImage(event: any) {
    if (this.differentImage) {
      event.target.innerText = "ürün için farklı görsel ekle";
      this.differentImage = false
    } else {
      event.target.innerText = "iptal et";
      this.differentImage = true;
      this.formData.delete("images");

    }
  }
  createProduct() {
    this.stockString = "";
    this.productService.createProduct({
      name: this.productValue.value.name,
      description: this.productValue.value.description,
      categories: this.productCategory,
      properties: this.properties
    }).subscribe(res => {
      this.productId = res.data._id
      alert(res.data.name + " eklendi")
      document.getElementById("createStockArea")?.setAttribute("style", "display:block")
    }, (error: HttpErrorResponse) => {
      alert("birinci kısım product oluşturulurken hata: " + error.error.message)
    })
  }
  selectedProperty(i:number, element: any){
    this.properties[i] = element.target.value
    console.log(this.properties)
  }
  clearStockInputs(){
    this.price = 0;
      this.piece = 0;
      this.color = "";
      this.size ="";
      this.base = false;
      this.formData.delete("images");
      this.formData.delete("stock");
      this.urls = [];
  }

}

