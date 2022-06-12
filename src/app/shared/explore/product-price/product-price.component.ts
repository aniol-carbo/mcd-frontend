import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DbService} from "../../../core/services/db.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-explore-by-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss'],
  providers: [DbService, MatSnackBar]
})
export class ProductPriceComponent implements OnInit {

  date = new FormControl();
  formattedDate: string = '';
  productSku: string = '';

  productInfo: Product | undefined = undefined;

  constructor(private dbService: DbService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    const date = Math.floor(new Date(this.date.value).getTime() / 1000);
    this.formattedDate = new Date(this.date.value).toLocaleDateString();

    this.dbService.getProductPrice(this.productSku, date).then((result: any) => {
      if (result.message) {
        this.productInfo = undefined;
        this.snackBar.open(result.message, 'OK', {panelClass: 'error-snackbar', duration: 3000});
      } else {
        this.productInfo = result;
      }
    })
  }
}

interface Product {
  sku: string;
  name: string;
  initialprice: number;
  finalprice: number;
}
