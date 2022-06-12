import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DbService} from "../../../core/services/db.service";

@Component({
  selector: 'app-explore-by-quantity',
  templateUrl: './explore-by-quantity.component.html',
  styleUrls: ['./explore-by-quantity.component.scss'],
  providers: [DbService]
})
export class ExploreByQuantityComponent implements OnInit {

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

  displayedColumns: string[] = ['sku', 'name', 'total', 'date'];
  dataSource: any = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    const startDate = Math.floor(new Date(this.range.controls['start'].value).getTime() / 1000);
    const endDate = Math.floor(new Date(this.range.controls['end'].value).getTime() / 1000);

    this.dbService.getItemsByQuantity(this.selectedStatus, startDate, endDate, this.selectedOrder).then((result: any) => {
      this.dataSource = result;
    })
  }
}

interface Option {
  value: string;
  viewValue: string;
}
