import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../../assets/abi/abiV3.json";
declare let window: any;
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MatSnackBar]
})
export class AddProductComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV3;
  signerObject: any;
  signerAddress: any;

  isLoading: boolean = false;

  productForm: FormGroup = this.formBuilder.group({
    productSku: ['', Validators.required],
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    productQuantity: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.connectWithContract();
  }

  connectWithContract(): void {
    this.loadAbi();
    this.getMetamaskInfo();
    this.initializeContract();
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
        this.callConstructor();
      });
    }
    else {
      this.router.navigate(['/'])
    }
  }

  callConstructor(): void {
    console.log(this.contract)
    // this.contract.constructor().then((tx: any) => {
    //   this.provider.waitForTransaction(tx.hash)
    //     .then((response: any) => {
    //       console.log(response);
    //     })
    // }).catch((error: any) => {
    //   console.log(error.code);
    // });
  }

  addProduct(): void {
    const productSku = this.productForm.controls['productSku'].value;
    const productName = this.productForm.controls['productName'].value;
    const productDescription = this.productForm.controls['productDescription'].value;
    const productQuantity = this.productForm.controls['productQuantity'].value;

    this.contract.AddProduct(productSku, productName, productDescription, productQuantity).then((tx: any) => {
      this.isLoading = true;
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          this.isLoading = false;
          this.snackBar.open(`Successfully added product '${productSku}'`, 'OK', {panelClass: 'success-snackbar'});
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
