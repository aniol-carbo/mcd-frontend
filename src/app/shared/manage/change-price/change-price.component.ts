import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../../../assets/abi/abiV4.json";
declare let window: any;
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-replenish-stock',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.scss'],
  providers: [MatSnackBar]
})
export class ChangePriceComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV4;
  signerObject: any;
  signerAddress: any;

  isLoading: boolean = false;

  productForm: FormGroup = this.formBuilder.group({
    productSku: ['', Validators.required],
    productPrice: ['', Validators.required]
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

  changePrice(): void {
    const productSku = this.productForm.controls['productSku'].value;
    const productPrice = this.productForm.controls['productPrice'].value;

    this.contract.ChangePrice(productSku, productPrice).then((tx: any) => {
      this.isLoading = true;
      console.time('changePrice');
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          console.timeEnd('changePrice');
          this.isLoading = false;
          this.snackBar.open(`Successfully changed price to ${productPrice}`, 'OK', {panelClass: 'success-snackbar'});
        })
    }).catch((error: any) => {
      this.snackBar.open(error.code, 'OK', {panelClass: 'error-snackbar'});
      console.log(error);
    });
  }

}
