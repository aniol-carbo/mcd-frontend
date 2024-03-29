import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../../../assets/abi/abiV4.json";
declare let window: any;
import {environment} from "../../../../environments/environment";
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
  contractAddress: string = environment.contractAddressV4;
  signerObject: any;
  signerAddress: any;

  isLoading: boolean = false;

  productForm: FormGroup = this.formBuilder.group({
    productSku: ['', Validators.required],
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    productQuantity: ['', Validators.required],
    productPrice: ['', Validators.required],
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

  addProduct(): void {
    const productSku = this.productForm.controls['productSku'].value;
    const productName = this.productForm.controls['productName'].value;
    const productDescription = this.productForm.controls['productDescription'].value;
    const productQuantity = this.productForm.controls['productQuantity'].value;
    const productPrice = this.productForm.controls['productPrice'].value;

    this.contract.AddProduct(productSku, productName, productDescription, productQuantity, productPrice).then((tx: any) => {
      this.isLoading = true;
      console.time('addProduct');
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          console.timeEnd('addProduct');
          this.isLoading = false;
          this.snackBar.open(`Successfully added product '${productSku}'`, 'OK', {panelClass: 'success-snackbar'});
        })
    }).catch((error: any) => {
      this.snackBar.open(error.code, 'OK', {panelClass: 'error-snackbar'});
      console.log(error);
    });
  }

}
