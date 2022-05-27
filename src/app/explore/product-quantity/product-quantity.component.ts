import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {DbService} from "../../services/db.service";

@Component({
  selector: 'app-explore-by-price',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
  providers: [DbService]
})
export class ProductQuantityComponent implements OnInit {

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

    this.dbService.getProductQuantity(this.productSku, date).then((result: any) => {
      this.productInfo = result;
    })
  }
}

interface Product {
  sku: string;
  name: string;
  quantity: number;
}
