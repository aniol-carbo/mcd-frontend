import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
declare let window: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // let ethereum = window.ethereum;
    // if (ethereum === undefined) {
    //   alert("You need Metamask in order to Connect your Wallet");
    // } else if (window.provider === undefined) {
    //   this.router.navigate(['/']);
    // } else {
    //   this.connectWithContract();
    // }
  }

}
