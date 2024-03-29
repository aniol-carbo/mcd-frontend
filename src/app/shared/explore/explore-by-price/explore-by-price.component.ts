import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DbService} from "../../../core/services/db.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-explore-by-price',
  templateUrl: './explore-by-price.component.html',
  styleUrls: ['./explore-by-price.component.scss'],
  providers: [DbService, MatSnackBar]
})
export class ExploreByPriceComponent implements OnInit {

  selectedStatus: string = "";
  selectedOrder: string = "";

  status: Option[] = [
    {value: 'sold', viewValue: 'Sold'},
    {value: 'added', viewValue: 'Added'},
    {value: 'replenished', viewValue: 'Replenished'}
  ];

  orderBy: Option[] = [
    {value: 'asc', viewValue: 'Lowest to highest'},
    {value: 'desc', viewValue: 'Highest to lowest'}
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['sku', 'name', 'price', 'totalPrice', 'date'];
  dataSource: any = [];

  constructor(private dbService: DbService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    const startDate = Math.floor(new Date(this.range.controls['start'].value).getTime() / 1000);
    const endDate = Math.floor(new Date(this.range.controls['end'].value).getTime() / 1000);

    this.dbService.getItemsByPrice(this.selectedStatus, startDate, endDate, this.selectedOrder).then((result: any) => {
      if (result.message) {
        this.dataSource = [];
        this.snackBar.open(result.message, 'OK', {panelClass: 'error-snackbar', duration: 3000});
      } else {
        this.dataSource = result;
      }
    })
  }
}

interface Option {
  value: string;
  viewValue: string;
}
