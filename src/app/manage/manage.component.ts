import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../assets/abi/abiV2.json";
declare let window: any;
import {environment} from "../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV4;
  signerObject: any;
  signerAddress: any;

  productForm: FormGroup = this.formBuilder.group({
    productSku: ['', Validators.required],
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    productQuantity: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loadAbi(): void {
    this.abi = abi;
  }

  initializeContract(): void {
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.signerObject);
    console.log(this.contract)
  }

  getMetamaskInfo(): void {
    this.provider = window.provider;
    this.signerObject = this.provider.getSigner();
    this.signerObject.getAddress().then((value: any) => {
      this.signerAddress = value;
    });
  }

  connectWithContract(): void {
    this.loadAbi();
    this.getMetamaskInfo();
    this.initializeContract();
  }

  addProduct(): void {
    this.contract.AddProduct(this.productForm.controls['productSku'], this.productForm.controls['productName'], this.productForm.controls['productDescription'], this.productForm.controls['productQuantity']).then((tx: any) => {
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          //action after transaction is mined
          console.log(response);
        })
    }).catch((error: any) => {
      // if (error.code === "INVALID_ARGUMENT") {
      //   if (this.receiverAddress === undefined) alert("Receiver address cannot be empty!");
      //   else alert("Invalid receiver address!");
      // } else {
      console.log(error.code);
      // }
    });
  }

}
