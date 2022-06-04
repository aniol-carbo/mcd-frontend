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
    {value: 'asc', viewValue: 'De menor a mayor'},
    {value: 'desc', viewValue: 'De mayor a menor'}
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  displayedColumns: string[] = ['sku', 'name', 'total'];
  dataSource: any = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
  }

  searchItems(): void {
    const startDate = Math.floor(new Date(this.range.controls['start'].value).getTime() / 1000);
    const endDate = Math.floor(new Date(this.range.controls['end'].value).getTime() / 1000);

    this.dbService.getItemsByQuantity(this.selectedStatus, startDate, endDate, this.selectedOrder).then((result: any) => {
      console.log(result)
      this.dataSource = result;
    })
  }
}

interface Option {
  value: string;
  viewValue: string;
}

interface Item {
  sku: string;
  total: number;
}
