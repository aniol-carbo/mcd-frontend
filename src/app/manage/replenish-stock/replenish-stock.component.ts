import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../../assets/abi/abiV3.json";
declare let window: any;
import {environment} from "../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-replenish-stock',
  templateUrl: './replenish-stock.component.html',
  styleUrls: ['./replenish-stock.component.scss'],
  providers: [MatSnackBar]
})
export class ReplenishStockComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV3;
  signerObject: any;
  signerAddress: any;

  isLoading: boolean = false;

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

  replenishStock(): void {
    const productSku = this.productForm.controls['productSku'].value;
    const productQuantity = this.productForm.controls['productQuantity'].value;

    this.contract.ReplenishStock(productSku, productQuantity).then((tx: any) => {
      this.isLoading = true;
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          this.isLoading = false;
          this.snackBar.open(`Successfully replenished ${productQuantity} items`, 'OK', {panelClass: 'success-snackbar'});
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
