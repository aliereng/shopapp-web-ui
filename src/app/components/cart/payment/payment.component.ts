import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Address } from 'src/app/models/Address';
import { Cart } from 'src/app/models/Cart';
import { Customer } from 'src/app/models/Customer';
import { AddressService } from 'src/app/services/address.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  customer?: Customer;
  addresses: Array<Address> = []
  addressIndex!: number;
  transferAddress?: Address;
  billAddress?: Address;
  cbBillAddressisChecked: Boolean = true
  paymentStatus: Boolean = false;
  billAddressCheckedInput!: Boolean;
  gonderimMi!: Boolean;
  paymentSecure3DCheck!: Boolean;
  amount!: number;
  installmentPrices?: Array<any>;
  cart?: Cart
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    document.getElementById("addAddressArea")?.setAttribute("style", "display:none")

  }
  @ViewChild("cardHolderName") cardHolderName?: ElementRef;
  @ViewChild("cardNumber") cardNumber?: ElementRef;
  @ViewChild("cardMounth") cardMounth?: ElementRef;
  @ViewChild("cardYear") cardYear?: ElementRef;
  @ViewChild("cardSecurityCode") cardSecurityCode?: ElementRef;
  constructor(private alertifyService: AlertifyService, private addressService: AddressService, private service: ApiService, private paymentService: PaymentService, private customerService: CustomerService, private cartService: CartService) {
    this.addressService.getAddress().subscribe(response => {
      this.addresses = response.data

    }, (error: HttpErrorResponse) => {
      alert("Adresler getirilemedi: " + error.error.message)
      window.location.replace("/login");
    })
    this.amount = Number(localStorage.getItem("cartAmount"));
    this.customerService.getCustomer().subscribe(response => {
      this.customer = response.data
    })
    this.cartService.getCart().subscribe(response => {
      this.cart = response.data
    })
  }

  selectedAddress(selectAddress: Address, element: HTMLInputElement) {
    document.getElementById("addAddressArea")?.setAttribute("style", "display:none")

    if (this.transferAddress == null && this.billAddressCheckedInput) {
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      element.checked = true
      document.getElementById("addressBox")!.setAttribute("style", "animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style", "display:block");
    }
    if (this.transferAddress == selectAddress && element.checked) {
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      element.checked = true
      document.getElementById("addressBox")!.setAttribute("style", "animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style", "display:block");
    }
    if (this.transferAddress != null && this.transferAddress._id != selectAddress._id && element.checked) {
      this.transferAddress = selectAddress;
      this.billAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style", "animation-name:disableAddressArea");
      document.getElementById("transferAreaDown")!.setAttribute("style", "display:block");
    }
    if (!element.checked) {
      document.getElementById("selectedBillAddressArea")!.setAttribute("style", "display:block");
    }
    if (!element.checked && this.billAddress && !this.gonderimMi) {
      this.billAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style", "animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style", "display:block");
    }
    if (!element.checked && this.transferAddress != selectAddress && this.gonderimMi) {
      this.transferAddress = selectAddress;
      document.getElementById("addressBox")!.setAttribute("style", "animation-name:disableAddressArea");
      document.getElementById("billAreaDown")!.setAttribute("style", "display:block");
    }
  }

  showAddressPanel(element: HTMLElement) {
    document.getElementById("addressBox")!.setAttribute("style", "animation-name:showAddressArea");
    if (element.innerHTML.includes("Gönderim")) {
      this.gonderimMi = true;
    } else {
      this.gonderimMi = false;
    }
  }
  showBillSendAddress(element: HTMLInputElement) {
    if (!element.checked) {
      document.getElementById("selectedBillAddressArea")!.setAttribute("style", "display:block");
      this.billAddress = this.transferAddress;
    }
    else {
      document.getElementById("selectedBillAddressArea")!.setAttribute("style", "display:none");
      this.billAddress = this.transferAddress
    }

  }
  ngOnInit(): void {
    this.billAddressCheckedInput = true
    this.paymentSecure3DCheck = true
  }
  showAddAddressArea() {
    document.getElementById("addAddressArea")?.setAttribute("style", "display:flex")
    document.getElementById("transferAreaDown")?.setAttribute("style", "display:none")
    document.getElementById("selectedBillAddressArea")?.setAttribute("style", "display:none")
    document.getElementById("paymentArea")?.setAttribute("style", "display:none")

  }
  applyCart() {
    
    const request = this.setRequest();

    this.paymentService.pay(request).subscribe(response => {
      console.log(response)
      this.service.completeCart({deliveredAddress:this.transferAddress?._id, invoiceAddress:this.billAddress?._id, paymentId: response.data.paymentId, itemTransactions: response.data.itemTransactions}).subscribe((res:HttpResponse<any>)=> {
        window.location.replace("/user/order")
      },(error:HttpErrorResponse)=>{
        alert(error.error.message)
      })

    },((err:HttpErrorResponse)=> {
      this.alertifyService.error(err.error.message)
    }))
  }

  creditCardControl(e: HTMLInputElement) {

    if (e.value.length == 6) {
      this.paymentService.checkCreditCart({
        locale: navigator.language.toLowerCase(),
        conversationId: uuidv4(),
        binNumber: e.value,
        price: this.amount
      }).subscribe(result => {
        console.log(result)
        document.getElementById("bank-name")!.innerHTML = result.data.installmentDetails[0].bankName;
        document.getElementById("card-association")!.innerHTML = result.data.installmentDetails[0].cardAssociation === "MASTER_CARD"
          ? "Master Card"
          : "Visa";
        document.getElementById("card-type")!.innerHTML = result.data.installmentDetails[0].cardType === "CREDIT_CARD" ? "Kredi Kartı" : "Banka Kartı";
        this.installmentPrices = result.data.installmentDetails[0].installmentPrices;
        this.paymentSecure3DCheck = result.data.installmentDetails[0].force3ds === 0
          ? false
          : true
      })
    }
  }
  setRequest(){
    const basketItems: any = [];
    this.cart?.items.map(item => {
      basketItems.push({
        id: item.product._id,
        name: item.product.name,
        category1: item.product.categories[item.product.categories.length - 1].name,
        category2: item.product.categories[item.product.categories.length - 2].name,
        itemType: "physical",
        price: item.count * item.price,

      })
    })
    const request = {
      locale: navigator.language.toLowerCase(),
      conversationId: uuidv4(),
      price: this.amount,
      paidPrice: (this.amount * 1.2),
      currency: navigator.language.toLowerCase(),
      installment: 1,
      basketId: localStorage.getItem("cartId"),
      paymentChannel: "web",
      paymentGroup: "product",
      paymentCard: {
        cardHolderName: this.cardHolderName?.nativeElement.value,
        cardNumber: this.cardNumber?.nativeElement.value,
        expireMonth: this.cardMounth?.nativeElement.value,
        expireYear: this.cardYear?.nativeElement.value,
        cvc: this.cardSecurityCode?.nativeElement.value,
        registeredCard: "0"
      },
      buyer: {
        id: localStorage.getItem("userId"),
        name: this.customer?.name,
        surname: this.customer?.surname,
        gsmNumber: this.customer?.phone,
        email: this.customer?.email,
        identityNumber: this.customer?.identifyNumber,
        lastLoginDate: this.customer?.lastLoginDate.toString().split("T")[0] + " " + this.customer?.lastLoginDate.toString().split("T")[1].slice(0, 8),
        registrationDate: this.customer?.registeredDate.toString().split("T")[0] + " " + this.customer?.registeredDate.toString().split("T")[1].slice(0, 8),
        registrationAddress: this.transferAddress?.info.addressDesc,
        ip: this.customer?.ip,
        city: this.transferAddress?.info.city,
        country: "Türkiye",
        zipCode: this.transferAddress?.info.postalCode
      },
      shippingAddress: {
        contactName: this.transferAddress?.info.name + " " + this.transferAddress?.info.surname,
        city: this.transferAddress?.info.city,
        country: "Türkiye",
        address: this.transferAddress?.info.neighbourhood + " Mahallesi " + this.transferAddress?.info.street + " " + this.transferAddress?.info.district,
        zippCode: this.transferAddress?.info.postalCode
      },
      billingAddress: {
        contactName: this.billAddress?.info.name + " " + this.billAddress?.info.surname,
        city: this.billAddress?.info.city,
        country: "Türkiye",
        address: this.billAddress?.info.neighbourhood + " Mahallesi " + this.billAddress?.info.street + " " + this.billAddress?.info.district,
        zippCode: this.billAddress?.info.postalCode
      },
      basketItems
    }
    return request;
  }

}
