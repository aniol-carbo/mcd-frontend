import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ethers} from "ethers";
declare let window: any;

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  async connectWallet() {
    let ethereum = window.ethereum;
    if (ethereum === undefined) {
      alert("You need Metamask in order to Connect your Wallet")
    } else if (window.provider === undefined) {
      let provider = new ethers.providers.Web3Provider(ethereum, "any");
      window.provider = provider;
      await provider.send("eth_requestAccounts", []);
      this.router.navigate(['/landing']);
    } else {
      this.router.navigate(['/landing']);
    }
  }
}
