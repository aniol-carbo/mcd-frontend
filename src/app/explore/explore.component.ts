import { Component, OnInit } from '@angular/core';
import {ethers} from "ethers";
import abi from "../../assets/abi/abiV2.json";
declare let window: any;
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  contract: any;
  abi: any;

  provider: any;
  contractAddress: string = environment.contractAddressV3;
  signerObject: any;
  signerAddress: any;

  constructor() { }

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

}
