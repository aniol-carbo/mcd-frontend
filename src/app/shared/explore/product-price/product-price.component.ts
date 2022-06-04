import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DbService} from "../../../core/services/db.service";

@Component({
  selector: 'app-explore-by-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  providers: [DbService]
})
export class ProductPriceComponent implements OnInit {

  date = new FormControl();
  formattedDate: string = '';
  productSku: string = '';

  productInfo!: Product;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    const date = Math.floor(new Date(this.date.value).getTime() / 1000);
    this.formattedDate = new Date(this.date.value).toLocaleDateString();

    this.dbService.getProductPrice(this.productSku, date).then((result: any) => {
      this.productInfo = result;
    })
  }
}

interface Product {
  sku: string;
  name: string;
  initialprice: number;
  finalprice: number;
}
