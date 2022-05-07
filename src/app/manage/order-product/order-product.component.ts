import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../../assets/abi/abiV3.json";
declare let window: any;
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
  providers: [MatSnackBar]
})
export class OrderProductComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV3;
  signerObject: any;
  signerAddress: any;

  productForm: FormGroup = this.formBuilder.group({
    productSku: ['', Validators.required],
    productQuantity: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.connectWithContract();
  }

  loadAbi(): void {
    this.abi = abi;
  }

  initializeContract(): void {
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signerObject);
    console.log(this.contract)
  }

  getMetamaskInfo(): void {
    if (window.provider) {
      this.provider = window.provider;
      this.signerObject = this.provider.getSigner();
      this.signerObject.getAddress().then((value: any) => {
        this.signerAddress = value;
      });
    }
    else {
      this.router.navigate(['/'])
    }
  }

  connectWithContract(): void {
    this.loadAbi();
    this.getMetamaskInfo();
    this.initializeContract();
  }

  orderProduct(): void {
    const productSku = this.productForm.controls['productSku'].value;
    const productQuantity = this.productForm.controls['productQuantity'].value;

    this.contract.OrderProduct(productSku, productQuantity).then((tx: any) => {
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          //action after transaction is mined
          this.snackBar.open(`Successfully ordered ${productQuantity} items`, 'OK', {panelClass: 'success-snackbar'});
          console.log(response);
        })
    }).catch((error: any) => {
      // if (error.code === "INVALID_ARGUMENT") {
      //   if (this.receiverAddress === undefined) alert("Receiver address cannot be empty!");
      //   else alert("Invalid receiver address!");
      // } else {
      // console.log(error.code);
      // }
      this.snackBar.open(error.code, 'OK', {panelClass: 'error-snackbar'});
      console.log(error);
    });
  }

}
