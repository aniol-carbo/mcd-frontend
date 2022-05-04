import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../assets/abi/abiV3.json";
import {Router} from "@angular/router";
declare let window: any;
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV3;
  signerObject: any;
  signerAddress: any;

  productSku: any;
  productName: any;
  productDescription: any;
  productQuantity: any;

  retrievedQuantity: number = 0;
  productIds: any;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let ethereum = window.ethereum;
    if (ethereum === undefined) {
      alert("You need Metamask in order to Connect your Wallet");
    } else if (window.provider === undefined) {
      this.router.navigate(['/']);
    } else {
      this.connectWithContract();
    }
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

  callConstructor(): void {
    this.contract.InventoryAresh().then((tx: any) => {
      this.provider.waitForTransaction(tx.hash)
        .then((response: any) => {
          console.log(response);
        })
    }).catch((error: any) => {
      console.log(error.code);
    });
  }

  addProduct(): void {
    this.contract.AddProduct(this.productSku, this.productName, this.productDescription, Number(this.productQuantity)).then((tx: any) => {
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

  async getQuantity(): Promise<void> {
    let count = await this.contract.getProductQuantity(this.productSku);
    console.log("Retrieved total wave count...", parseInt(count, 16));
    this.retrievedQuantity = parseInt(count, 16);
  }

  async getProductIds(): Promise<void> {
    const ids = await this.contract.getProductIds();
    console.log("Retrieved total wave count...", ids);
    this.productIds = ids;
  }

}
